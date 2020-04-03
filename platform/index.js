let express = require('express');
let app = express();
let helmet = require('helmet');

app.use(helmet());

app.use(express.static('static'));

const port = 3000;
let server = app.listen(port, (req, res) => {
    console.log(`Listening on ${port}`);
});