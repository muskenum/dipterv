const express = require('express');
const app = express();
const helmet = require('helmet');

// Including all the routes
//require('./routes/index')(app);

app.use(helmet());

app.use(express.static('static'));

const port = 3000;
const server = app.listen(port, (req, res) => {
    console.log(`Listening on ${port}`);
});