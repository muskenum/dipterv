const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if ((typeof req.body.Capacity === 'undefined') ||
            (typeof req.body._Creator === 'undefined') ||
            (typeof req.body._Game === 'undefined')) {
            return next();
        }
        console.log(req.body);
        res.redirect('/lobbies/:lobbyid');
    };
};