import { APIGatewayProxyHandler } from 'aws-lambda';
const aws = require('aws-sdk');
import read from './shared/s3';
import { calculateCurrentTournamentId } from './shared/tournaments';
import triggerNantzBot from './NantzBot';
var wordleParser = require('./wordleParser');

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	GROUPME_KEY
	GROUP_ID
Amplify Params - DO NOT EDIT */

export type groupmeSecrets = {
    BOT_ID: string,
    GROUP_ID: string,
    GROUPME_KEY: string,
    WEBHOOK_URL: string,
}

const generateParameters = async () :Promise<groupmeSecrets> => {
    const { Parameters } = await (new aws.SSM())
    .getParameters({
        Names: ["GROUP_ID", "GROUPME_KEY", "WEBHOOK_URL", "BOT_ID"].map(secretName => process.env[secretName]),
        WithDecryption: true,
    })
    .promise();
        
    const WEBHOOK_URL = Parameters.pop().Value;
    const GROUP_ID = Parameters.pop().Value;
    const GROUPME_KEY = Parameters.pop().Value;
    const BOT_ID = Parameters.pop().Value;
    return {
        BOT_ID: BOT_ID,
        GROUP_ID: GROUP_ID,
        GROUPME_KEY: GROUPME_KEY,
        WEBHOOK_URL: WEBHOOK_URL,
    }
}

exports.handler = async (event :APIGatewayProxyHandler) => {
    const secrets = await generateParameters();
	let currentTournamentId = await calculateCurrentTournamentId(false);
	if (event["NantzBot"] && process.env.ENV === 'main') {
        currentTournamentId = await calculateCurrentTournamentId(true);
		const result = await read(`tournament-${currentTournamentId}.json`);
		await triggerNantzBot(result.data, secrets);
	} else {
    	await wordleParser.gatherWordleMessages(secrets, currentTournamentId);
	}
};
