var axios = require('axios')
import { tournaments, generateHoles, tournamentFilename } from './shared/tournaments';
import { GroupMeMessage, Player } from './shared/types';
import { write } from './shared/s3';
import { groupmeSecrets } from 'src';
import relationToPar from './utilities';

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

const getWordleBits = (text:string) :[number, number] => {
    const textRow = text.split(' ');
    let result = textRow[2].split('/')[0];
    if (result === 'X') { result = '7'; }
    return [parseInt(textRow[1]), parseInt(result)];
}

const parseAndWrite = async (messages :GroupMeMessage[], secrets:groupmeSecrets, currentTournamentId: number) => {
	const playersObject = tournaments[currentTournamentId].overrides;
    let highestArrayPosition = 0;
    messages.forEach(message => {
        const senderId = parseInt(message.sender_id);
        if (!playersObject[message.sender_id as keyof typeof playersObject]) {
            playersObject[message.sender_id as keyof typeof playersObject] = {
                id: senderId,
                displayName: message.name,
                scores: []
            }
        }
        const wordleBits = getWordleBits(message.text);
        const arrayPosition = wordleBits[0] - tournaments[currentTournamentId].beforeStartWordle - 1;
        if (arrayPosition >= 0) {
            if (arrayPosition > highestArrayPosition) {
                highestArrayPosition = arrayPosition;
            }
            playersObject[message.sender_id as keyof typeof playersObject]
                .scores[arrayPosition] = wordleBits[1];
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
        finished: highestArrayPosition === 17,
    }

    await write(ret, tournamentFilename(currentTournamentId));
    //rebuild front end
    if (process.env.ENV === 'main') {
        await axios.post(secrets.WEBHOOK_URL, {});
    }
}

const findMessages = async (before_id :string, foundMessages :GroupMeMessage[], secrets :groupmeSecrets, currentTournamentId:number) => {
    const url = `https://api.groupme.com/v3/groups/${secrets.GROUP_ID}/messages?token=${secrets.GROUPME_KEY}&before_id=${before_id}`
    const response = await axios.get(url).catch(error => console.log(error));
    await findTourneyShares(response.data.response, foundMessages, secrets, currentTournamentId);
};

const findTourneyShares = async (response : any, foundMessages :GroupMeMessage[], secrets:groupmeSecrets, currentTournamentId: number) => {
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
        await parseAndWrite(foundMessages, secrets, currentTournamentId);
    } else {
        await findMessages(next, foundMessages, secrets, currentTournamentId)
    }
};

const gatherWordleMessages = async (secrets, currentTournamentId) => {
    let foundMessages :any = [];
    await findMessages('', foundMessages, secrets, currentTournamentId);
};

module.exports = { gatherWordleMessages }