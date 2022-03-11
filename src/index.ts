const fs = require('fs');
var pug = require('pug');
import { tournaments, generateHoles } from '../shared/tournaments';
import read from '../shared/s3';
import { Tournament } from '../shared/types';

(async () => {
    let fn = pug.compileFile('views/leaderboard.pug');
    let scheduleFn = pug.compileFile('views/schedule.pug');
    let currentTournamentId = 0;
    const finalTournamentData :Tournament[]= [];
    for (var i=0; i < tournaments.length; i++) {
        let result = await read(`tournament-${i}.json`);
        if (result === 'NoSuchKey') {
            result = {
                data: tournaments[i]
            };
            if (currentTournamentId === 0) {
                currentTournamentId = i - 1;
            }
        }
        result.data.holes = generateHoles(result.data);
        result.data.last = i === tournaments.length-1;
        finalTournamentData.push(result.data)
    }
    fs.writeFile('build/index.html', fn(finalTournamentData[currentTournamentId]), (err :any) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    fs.writeFile('build/schedule.html', scheduleFn({data: finalTournamentData}), (err :any) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    finalTournamentData.forEach((t, i) => {
        fs.writeFile(`build/${i}.html`, fn(finalTournamentData[i]), (err :any) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    })
})().catch(e => {
    console.log(e)
});