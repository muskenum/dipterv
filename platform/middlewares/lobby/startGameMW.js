const requireOption = require('../requireOption');
const game = require('../../uploads/panzerkampf/index');

module.exports = (objectrepository) => {
    return function (req, res, next) {
        const childProcess = require('child_process');
    };
    const gameInstance = childProcess.fork(game);
};