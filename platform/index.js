const express = require('express');
const app = express();
const helmet = require('helmet');

// Including all the routes
require('./routes/index')(app);

app.use(helmet());

app.set('view engine', 'ejs');

app.use(express.static('static'));

const port = 3000;
app.listen(port, (req, res) => {
    console.log(`Listening on ${port}`);
});