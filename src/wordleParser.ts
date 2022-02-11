var API = require('groupme').Stateless;
const fs = require('fs');
var GROUPME_KEY = process.env.GROUPME_KEY;
var GROUP = process.env.GROUP_ID;

import { beforeStartWordle } from './utilities'
import { GroupMeMessage, Player } from './types';

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
        const arrayPosition = wordleId - beforeStartWordle - 1;
        if (arrayPosition >= 0) {
            playersObject[message.sender_id as keyof typeof playersObject]
                .scores[arrayPosition] = parseInt(result);
        }
    });
    fs.writeFile('./players.json',
        JSON.stringify(Object.values(playersObject)), (err :any) => {                        if (err) throw err;
        console.log('Data written to file');
    });
}

const findMessages = (callback :Function, options = {}, foundMessages :GroupMeMessage[]) => {
    API.Messages.index(GROUPME_KEY, GROUP, options, function(err :any ,ret :any) {
        if (!err) {
            callback(ret, foundMessages);       
        }
    });
};

const findTourneyShares = (response : any, foundMessages :GroupMeMessage[]) => {
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
                parseAndWrite(foundMessages);
            }
        }
    })
    if (!stop) {
        return findMessages(findTourneyShares, {before_id: next}, foundMessages)
    }
};

export const gatherWordleMessages = (callback :Function) => {
    let foundMessages :any = [];
    findMessages(findTourneyShares, {}, foundMessages)
    callback();

};

export default findMessages;