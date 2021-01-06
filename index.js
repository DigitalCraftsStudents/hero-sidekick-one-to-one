const http = require('http');
const express = require('express');
const morgan = require('morgan');

const PORT = 3001;
const app = express();
const server = http.createServer(app);

const logger = morgan('dev');
app.use(logger);

app.get('/', (req, res) => {
    res.send(`<h1>Hello there!</h1>`);
});

server.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});