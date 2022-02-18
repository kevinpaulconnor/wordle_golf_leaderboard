var axios = require('axios')
var GROUPME_KEY = process.env.GROUPME_KEY;
var GROUP = process.env.GROUP_ID;

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

const findMessages = async (before_id :string, foundMessages :GroupMeMessage[]) => {
    const url = `https://api.groupme.com/v3/groups/${GROUP}/messages?token=${GROUPME_KEY}&before_id=${before_id}`
    const response = await axios.get(url).catch(error => console.log(error));
    await findTourneyShares(response.data.response, foundMessages);
};

const findTourneyShares = async (response : any, foundMessages :GroupMeMessage[]) => {
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
        await findMessages(next, foundMessages)
    }
};

const gatherWordleMessages = async () => {
    let foundMessages :any = [];
    await findMessages('', foundMessages);
};

module.exports = { gatherWordleMessages }