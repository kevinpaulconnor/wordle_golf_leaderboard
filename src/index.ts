

const fs = require('fs');
var pug = require('pug');
import generateData from './defaultData';

let fn = pug.compileFile('views/leaderboard.pug')
fs.writeFile('index.html', fn(generateData()), (err :any) => {
    if (err) throw err;
    console.log('Data written to file');
});