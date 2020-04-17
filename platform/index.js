const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('static'));

// Including all the routes
require('./routes/index')(app);

app.use(helmet());





const port = 3000;
app.listen(port, (req, res) => {
    console.log(`Listening on ${port}`);
});