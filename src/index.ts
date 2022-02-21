

const fs = require('fs');
var pug = require('pug');
import currentTournamentId, { tournaments} from '../shared/tournaments';
import { Tournament } from '../shared/types';
const aws = require('aws-sdk');
var s3 = new aws.S3();
const bucketName = 'tournamentsbucket223547-main';

(async () => {
    async function read(filename:string) {
        try {
            const params = {
                Bucket: bucketName,
                Key: filename
            }
            const data = await s3.getObject(params).promise();
            return {
                data: JSON.parse(data.Body),
                lastModified: data.LastModified,
            }
        } catch (e:any) {
            if (e.code === "NoSuchKey") {
                return e.code;
            }
            throw new Error(`Could not retrieve file from S3: ${e.message}`)
        }
    }

    let fn = pug.compileFile('views/leaderboard.pug')
    const finalTournamentData :Tournament[]= [];
    for (var i=0; i < tournaments.length; i++) {
        const result = await read(`tournament-${i}.json`);
        result.last = i === tournaments.length-1;
        finalTournamentData.push(result)
    }
    fs.writeFile('build/index.html', fn(finalTournamentData[currentTournamentId]), (err :any) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    finalTournamentData.forEach(t => {
        fs.writeFile(`build/${currentTournamentId}.html`, fn(finalTournamentData[currentTournamentId]), (err :any) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    })
})().catch(e => {
    console.log(e)
});