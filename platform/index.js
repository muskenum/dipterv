const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(session({
    secret: 'jsklhkjkslghSJISADF',
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    console.log(Date.now());
    //console.log(req.session);
    console.log(res.locals.session);
    return next();
});

io.on('connection', socket => {
    console.log('A user has connected');
    socket.on('user', data => {
        console.log(data);
        io.emit('userName', data);
    });
    socket.on('message', data => {
        console.log(data);
        io.emit('prevMsg', data);
    });
    /*socket.on('typing', data => {
        io.broadcast('typing', data);
    });*/
    socket.on('disconnect', data => {
        console.log('A user has disconnected');
    });
});


// Including all the routes
require('./routes/index')(app);

app.use((err, req, res, next) => {
    res.end('Something went wrong...Ooops');
    console.log(err);
});

/*const port = 3000;
http.listen(port, (req, res) => {
    console.log(`Listening on ${port}`);
});*/
const port = app.listen(process.env.PORT || 3000);
http.listen(port);
