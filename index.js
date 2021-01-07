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

app.use(express.urlencoded({ extended: true }));

// Op contains comparison operators
const { Op } = require('sequelize');
const { Hero, Sidekick } = require('./models');
const { layout } = require('./utils');

app.get('/list', async (req, res) => {
    const heroes = await Hero.findAll({
        include: Sidekick,
        order: [
            ['name', 'asc']
        ]
    });
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

app.get('/hero/:id/sidekick', async (req, res) => {
    const { id } = req.params;
    const hero = await Hero.findByPk(id);
    // get list of sidekicks from database
    const sidekicks = await Sidekick.findAll({
        // This filters out any Sidekicks that are
        // already assigned to a Hero
        // where: {
        //     heroId: {
        //         [Op.eq]: null
        //     }
        // },
        order: [
            ['name', 'asc']
        ]
    });
    console.log(JSON.stringify(sidekicks, null, 4));
    res.render('form', {
        locals: {
            hero,
            sidekicks
        },
        ...layout
    });
});
app.post('/hero/:id/sidekick', async (req, res) => {
    const { id } = req.params;
    const { sidekickId } = req.body;
    const hero = await Hero.findByPk(id);
    //const sidekick = await Sidekick.findByPk(sidekickId);
    // we associate the Hero and the Sidekick
    await hero.setSidekick(sidekickId);
    //await hero.setSidekick(sidekick); // alternatively, pass a Sidekick obj
    await hero.save();

    res.redirect('/list');
});


app.get('/', (req, res) => {
    res.send(`
        <h1>Hello there!</h1>
    `);
});

server.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});