

const fs = require('fs');
var pug = require('pug');
import generateData from './defaultData';
import currentTournament from '../shared/tournaments';

let fn = pug.compileFile('views/leaderboard.pug')
fs.writeFile('build/index.html', fn(generateData(currentTournament)), (err :any) => {
    if (err) throw err;
    console.log('Data written to file');
});