import { APIGatewayProxyHandler } from 'aws-lambda';
var wordleParser = require('./wordleParser');

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	GROUPME_KEY
	GROUP_ID
Amplify Params - DO NOT EDIT */

exports.handler = async (event :APIGatewayProxyHandler) => {
    await wordleParser.gatherWordleMessages();
};
