import express from 'express';
require('dotenv').config();

import generateData from './defaultData';
import { gatherWordleMessages } from './wordleParser';
const app = express()
app.set('view engine', 'pug')
app.set('views', ['views', '../views'])

app.get('/', (req, res) => {
  res.render('leaderboard', generateData());
})

app.get('/gatherMessages', async (req, res) => {
    gatherWordleMessages(() => {
        res.json({
            message: 'Data updated'
        }); 
    }); 
})

app.listen(8000, () => {
  console.log('The application is listening on port 8000...')
})