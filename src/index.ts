

const fs = require('fs');
var pug = require('pug');
import generateData from './defaultData';
import currentTournamentId, { tournaments} from '../shared/tournaments';
import { Tournament } from '../shared/types';

(async () => {
        let fn = pug.compileFile('views/leaderboard.pug')
        const finalTournamentData :Tournament[]= [];
        for (var i=0; i < tournaments.length; i++) {
            const result = await generateData(tournaments[i]);
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