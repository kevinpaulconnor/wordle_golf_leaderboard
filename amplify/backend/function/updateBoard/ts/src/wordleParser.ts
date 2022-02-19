var axios = require('axios')
const aws = require('aws-sdk');

type groupmeSecrets = {
    GROUP_ID: string,
    GROUPME_KEY: string
}

const generateParameters = async () :Promise<groupmeSecrets> => {
    const Parameters = await (new aws.SSM())
    .getParameters({
        Names: ["GROUP_ID", "GROUPME_KEY"].map(secretName => process.env[secretName]),
        WithDecryption: true,
    })
    .promise();
        
    return {
        GROUP_ID: Parameters.pop().Value,
        GROUPME_KEY: Parameters.pop().Value,
    }
}

import currentTournament from './shared/tournaments';
import { GroupMeMessage, Player } from './shared/types';

const beforeTourneyStart = 1643781600;

const parseAndWrite = (messages :GroupMeMessage[]) => {
	const playersObject: { [key: string]: Player; } = {};
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
        const arrayPosition = wordleId - currentTournament.beforeStartWordle - 1;
        if (arrayPosition >= 0) {
            playersObject[message.sender_id as keyof typeof playersObject]
                .scores[arrayPosition] = parseInt(result);
        }
    });
    //fs.writeFile('./players.json',
        //JSON.stringify(Object.values(playersObject)), (err :any) => {                        if (err) throw err;
        console.log(JSON.stringify(Object.values(playersObject)));
    //});
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
            if (message.created_at > beforeTourneyStart) {
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
        parseAndWrite(foundMessages);
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