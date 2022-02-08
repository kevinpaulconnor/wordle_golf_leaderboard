import express from 'express';
import generateData from './defaultData';
const app = express()
app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)

app.get('/test', (req, res) => {
  res.render('leaderboard', generateData());
})

app.listen(8000, () => {
  console.log('The application is listening on port 8000...')
})