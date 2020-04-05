/*
const authMW = require('../middlewares/generic/auth');
const renderMW = require('../middlewares/generic/render');

const getUserMW = require('../middlewares/user/getUser');


module.exports = function (app) {
    const objectrepository = {
        UserModel: UserModel,
        GameModel: GameModel,
        LobbyModel: LobbyModel
    };

    app.get(
        '/users/:userid',
        authMW(objectrepository),
        getUserMW(objectrepository),
        renderMW(objectrepository)
        );
};
*/
