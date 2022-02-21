var axios = require('axios')
const aws = require('aws-sdk');
var s3 = new aws.S3();
const bucketName = process.env.STORAGE_TOURNAMENTSRESOURCE_BUCKETNAME;
import currentTournamentId, { tournaments } from './shared/tournaments';
import { GroupMeMessage, Player, Tournament, Hole } from './shared/types';
import generateHoles, { relationToPar } from './utilities';
import finishTasks from './finish';

type groupmeSecrets = {
    GROUP_ID: string,
    GROUPME_KEY: string,
    WEBHOOK_URL: string,
}

const generateParameters = async () :Promise<groupmeSecrets> => {
    const { Parameters } = await (new aws.SSM())
    .getParameters({
        Names: ["GROUP_ID", "GROUPME_KEY", "WEBHOOK_URL"].map(secretName => process.env[secretName]),
        WithDecryption: true,
    })
    .promise();
        
    const WEBHOOK_URL = Parameters.pop().Value;
    const GROUP_ID = Parameters.pop().Value;
    const GROUPME_KEY = Parameters.pop().Value;
    return {
        GROUP_ID: GROUP_ID,
        GROUPME_KEY: GROUPME_KEY,
        WEBHOOK_URL: WEBHOOK_URL,
    }
}

function write(item, filename) {
    const params ={ 
      Bucket : bucketName,
      Key : filename,
      Body: JSON.stringify(item),
    };
    return s3.putObject(params, () => {}).promise();
  }
  
  function tournamentFilename(id) {
    return `tournament-${id}.json`;
  }

const calculateLeaders = (players:Player[]) :string[] => {
    let ret = [players[0].displayName];
    let leadingTotal = players[0].total;
    for(var i=1; i < players.length; i++) {
        if (players[i].total === leadingTotal) {
            ret.push(players[i].displayName);
        }
    }
    return ret;
}

const calculateLastDay = (tournament:Tournament, holes:Hole[]) :boolean => {
    return holes[17].number === tournament.beforeStartWordle + 18;
}

const parseAndWrite = async (messages :GroupMeMessage[], secrets:groupmeSecrets) => {
	const playersObject = tournaments[currentTournamentId].overrides;
    messages.forEach(message => {
        const senderId = parseInt(message.sender_id);
        if (!playersObject[message.sender_id as keyof typeof playersObject]) {
            playersObject[message.sender_id as keyof typeof playersObject] = {
                id: senderId,
                displayName: message.name,
                scores: []
            }
        }
        const textRow = message.text.split(' ');
        let result = textRow[2].split('/')[0];
        if (result === 'X') { result = '7'; }
        const wordleId = parseInt(textRow[1]);
        const arrayPosition = wordleId - tournaments[currentTournamentId].beforeStartWordle - 1;
        if (arrayPosition >= 0) {
            playersObject[message.sender_id as keyof typeof playersObject]
                .scores[arrayPosition] = parseInt(result);
        }
    });
    let currentTournament = tournaments[currentTournamentId];
    const holes = generateHoles(currentTournament);
    const playersArray = Object.values(playersObject);
	playersArray.forEach( (player:Player) => {
		player.total = relationToPar(player.scores, holes);
	});
	playersArray.sort((a:Player, b:Player) => {
		if (a.total !== undefined && b.total !== undefined) {
			if (a.total < b.total) return -1;
			else if (b.total < a.total) return 1;
			else return 0;
		}
		return 0;
	})

	let ret = {...currentTournament, 
		players: playersArray,
		holes: holes,
        leaders: calculateLeaders(playersArray),
        lastDay: calculateLastDay(currentTournament, holes)
    }

    await write(ret, tournamentFilename(currentTournamentId));
    await finishTasks(ret, secrets);
}

const findMessages = async (before_id :string, foundMessages :GroupMeMessage[], secrets :groupmeSecrets) => {
    const url = `https://api.groupme.com/v3/groups/${secrets.GROUP_ID}/messages?token=${secrets.GROUPME_KEY}&before_id=${before_id}`
    const response = await axios.get(url).catch(error => console.log(error));
    await findTourneyShares(response.data.response, foundMessages, secrets);
};

const findTourneyShares = async (response : any, foundMessages :GroupMeMessage[], secrets:groupmeSecrets) => {
    const wordleRegex = /^Wordle \d\d\d .\/\d/;
    let stop = false;
    let next = '';
    response.messages.forEach((message :any) => {
        if (message.text) {
            if (message.created_at > tournaments[currentTournamentId].beforeStartTime) {
                if (wordleRegex.test(message.text) === true) {
                    foundMessages.push(message);
                }
                next = message.id;
            } else {
                stop = true;
            }
        }
    })
    if (stop) {
        await parseAndWrite(foundMessages, secrets);
    } else {
        await findMessages(next, foundMessages, secrets)
    }
};

const gatherWordleMessages = async () => {
    let foundMessages :any = [];
    const secrets = await generateParameters();
    await findMessages('', foundMessages, secrets);
};

module.exports = { gatherWordleMessages }