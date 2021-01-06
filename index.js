const http = require('http');
const express = require('express');
const morgan = require('morgan');

const PORT = 3001;
const app = express();
const server = http.createServer(app);

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const logger = morgan('dev');
app.use(logger);

const { Hero } = require('./models');
const { layout } = require('./utils');

app.get('/list', async (req, res) => {
    const heroes = await Hero.findAll();
    // console.log() of the heroes array
    console.log(JSON.stringify(heroes, null, 4));
    //res.json(heroes);
    res.render('list', {
        locals: {
            heroes,
        },
        ...layout
    });
    //res.send('this should be a list of heroes');
});
app.get('/', (req, res) => {
    res.send(`
        <h1>Hello there!</h1>
    `);
});

server.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});