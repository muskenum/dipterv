const authMW = require('../middlewares/auth/authMW');
const checkUserCredentialsMW = require('../middlewares/auth/checkUserCredentialsMW');
const handleWrongPassMW = require('../middlewares/auth/handleWrongPassMW');

const delGameMW = require('../middlewares/game/delGameMW');
const getGameMW = require('../middlewares/game/getGameMW');
const getGamesMW = require('../middlewares/game/getGamesMW');
const saveGameMW = require('../middlewares/game/saveGameMW');

const renderMW = require('../middlewares/generic/renderMW');
const sendMsgMW = require('../middlewares/generic/sendMsgMW');

const getLobbiesMW = require('../middlewares/lobby/getLobbiesMW');
const getLobbyMW = require('../middlewares/lobby/getLobbyMW');
const saveLobbyMW = require('../middlewares/lobby/saveLobbyMW');

const delUserMW = require('../middlewares/user/delUserMW');
const getActiveUsersMW = require('../middlewares/user/getActiveUsersMW');
const getUserMW = require('../middlewares/user/getUserMW');
const getUsersMW = require('../middlewares/user/getUsersMW');
const saveUserMW = require('../middlewares/user/saveUserMW');

const UserModel = require('../models/user');
const GameModel = require('../models/game');
const LobbyModel = require('../models/lobby');

module.exports = function (app) {
    const objectrepository = {
        UserModel: UserModel,
        GameModel: GameModel,
        LobbyModel: LobbyModel
    };

    app.get(
        '/users',
        authMW(objectrepository),
        getUsersMW(objectrepository),
        renderMW(objectrepository, 'users')
    );
    app.use(
        '/users/new',
        authMW(objectrepository),
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
    app.get(
        '/games',
        getGamesMW(objectrepository),
        renderMW(objectrepository, 'games')
    );
    app.use(
        '/games/new',
        authMW(objectrepository),
        saveGameMW(objectrepository),
        renderMW(objectrepository, 'uploadedit')
    );
    app.get(
        '/games/:gameid',
        authMW(objectrepository),
        getGameMW(objectrepository),
        renderMW(objectrepository, 'game')
    );
    app.use(
        '/games/edit/:gameid',
        authMW(objectrepository),
        getGameMW(objectrepository),
        saveGameMW(objectrepository),
        renderMW(objectrepository, 'uploadedit')
    );
    app.get(
        '/games/del/:gameid',
        authMW(objectrepository),
        getGameMW(objectrepository),
        delGameMW(objectrepository),
        renderMW(objectrepository, 'usersgames')
    );
    app.use(
        '/chat',
        authMW(objectrepository),
        getActiveUsersMW(objectrepository),
        sendMsgMW(objectrepository),
        renderMW(objectrepository, 'chat')
    );
    app.use(
        '/login',
        checkUserCredentialsMW(objectrepository),
        handleWrongPassMW(objectrepository),
        renderMW(objectrepository, 'login')
    );
    app.get(
        '/lobbies',
        authMW(objectrepository),
        getLobbiesMW(objectrepository),
        renderMW(objectrepository, 'lobbies')
    );
    app.use(
        '/lobbies/new',
        authMW(objectrepository),
        getGamesMW(objectrepository),
        getUserMW(objectrepository),
        saveLobbyMW(objectrepository),
        renderMW(objectrepository, 'lobbyeditnew')
    );
    app.get(
        '/lobbies/:lobbyid',
        authMW(objectrepository),
        getUserMW(objectrepository),
        getLobbyMW(objectrepository),
        renderMW(objectrepository, 'lobby')
    );
    app.use(
        '/lobbies/edit/:lobbyid',
        authMW(objectrepository),
        getLobbyMW(objectrepository),
        getGamesMW(objectrepository),
        saveLobbyMW(objectrepository),
        renderMW(objectrepository, 'lobbyeditnew')
    );

    app.get(
        '/',
        renderMW(objectrepository, 'index')
    );
};

