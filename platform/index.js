const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(session({
    secret: 'jsklhkjkslghSJISADF',
}));

// Including all the routes
require('./routes/index')(app);

app.use((err, req, res, next) => {
    res.end('SOmethingwent wrong...OOOps');
    console.log(err);
});

const port = 3000;
app.listen(port, (req, res) => {
    console.log(`Listening on ${port}`);
});