const authMW = require('../middlewares/auth/authMW');
const checkUserCredentialsMW = require('../middlewares/auth/checkUserCredentialsMW');
const logoutMW = require('../middlewares/auth/logoutMW');

const delGameMW = require('../middlewares/game/delGameMW');
const getGameMW = require('../middlewares/game/getGameMW');
const getGamesMW = require('../middlewares/game/getGamesMW');
const saveGameMW = require('../middlewares/game/saveGameMW');

const renderMW = require('../middlewares/generic/renderMW');
const sendMsgMW = require('../middlewares/generic/sendMsgMW');

const getLobbiesMW = require('../middlewares/lobby/getLobbiesMW');
const getLobbyMW = require('../middlewares/lobby/getLobbyMW');
const saveLobbyMW = require('../middlewares/lobby/saveLobbyMW');
const startGameMW = require('../middlewares/lobby/startGameMW');

const delUserMW = require('../middlewares/user/delUserMW');
const getActiveUsersMW = require('../middlewares/user/getActiveUsersMW');
const getUserMW = require('../middlewares/user/getUserMW');
const getUsersMW = require('../middlewares/user/getUsersMW');
const saveUserMW = require('../middlewares/user/saveUserMW');

const UserModel = require('../models/user');
const GameModel = require('../models/game');
const LobbyModel = require('../models/lobby');

const multer = require('multer');
const upload = multer({dest: './uploads'});

module.exports = function (app) {
    const objectrepository = {
        UserModel: UserModel,
        GameModel: GameModel,
        LobbyModel: LobbyModel
    };

    app.get(
        '/users/:userid/games',
        authMW(objectrepository),
        getUserMW(objectrepository),
        getGamesMW(objectrepository),
        renderMW(objectrepository, 'usersgames')
    );
    app.use(
        '/users/edit/:userid',
        authMW(objectrepository),
        getUserMW(objectrepository),
        saveUserMW(objectrepository),
        renderMW(objectrepository, 'signupedit')
    );
    app.get(
        '/users/del/:userid',
        authMW(objectrepository),
        getUserMW(objectrepository),
        getGamesMW(objectrepository),
        delGameMW(objectrepository),
        delUserMW(objectrepository),
        renderMW(objectrepository, 'index')
    );
    app.use(
        '/users/new',
        saveUserMW(objectrepository),
        renderMW(objectrepository, 'signupedit')
    );
    app.get(
        '/users/:userid',
        authMW(objectrepository),
        getUserMW(objectrepository),
        renderMW(objectrepository, 'profile')
    );
    app.get(
        '/users',
        authMW(objectrepository),
        getUsersMW(objectrepository),
        renderMW(objectrepository, 'users')
    );
    app.use(
        '/games/edit/:gameid',
        authMW(objectrepository),
        upload.single('gamefile'),
        getGameMW(objectrepository),
        saveGameMW(objectrepository),
        renderMW(objectrepository, 'uploadedit')
    );
    app.get(
        '/games/del/:gameid',
        authMW(objectrepository),
        getGameMW(objectrepository),
        getUserMW(objectrepository),
        delGameMW(objectrepository),
        renderMW(objectrepository, 'usersgames')
    );
    app.use(
        '/games/new',
        authMW(objectrepository),
        upload.single('gamefile'),
        saveGameMW(objectrepository),
        renderMW(objectrepository, 'uploadedit')
    );
    app.get(
        '/games/:gameid',
        authMW(objectrepository),
        getGameMW(objectrepository),
        getUserMW(objectrepository),
        renderMW(objectrepository, 'game')
    );
    app.get(
        '/games',
        authMW(objectrepository),
        getGamesMW(objectrepository),
        renderMW(objectrepository, 'games')
    );
    app.use(
        '/chat',
        authMW(objectrepository),
        getActiveUsersMW(objectrepository),
        sendMsgMW(objectrepository),
        renderMW(objectrepository, 'chat')
    );
    app.use(
        '/lobbies/edit/:lobbyid',
        authMW(objectrepository),
        getLobbyMW(objectrepository),
        getGamesMW(objectrepository),
        saveLobbyMW(objectrepository),
        renderMW(objectrepository, 'lobbyeditnew')
    );
    app.use(
        '/lobbies/new',
        authMW(objectrepository),
        getGamesMW(objectrepository),
        saveLobbyMW(objectrepository),
        renderMW(objectrepository, 'lobbyeditnew')
    );
    app.get(
        '/lobbies/:lobbyid',
        authMW(objectrepository),
        getLobbyMW(objectrepository),
        getGameMW(objectrepository),
        getUserMW(objectrepository),
        renderMW(objectrepository, 'lobby')
    );
    app.get(
        '/lobbies',
        authMW(objectrepository),
        getLobbiesMW(objectrepository),
        renderMW(objectrepository, 'lobbies')
    );
    app.use(
        '/login',
        checkUserCredentialsMW(objectrepository),
        renderMW(objectrepository, 'login')
    );
    app.get(
        '/logout',
        authMW(objectrepository),
        logoutMW(objectrepository),
        renderMW(objectrepository, 'index')
    );
    app.use(
        '/matches',
        authMW(objectrepository),
        startGameMW(objectrepository)
    );
    app.get(
        '/',
        renderMW(objectrepository, 'index')
    );
};

