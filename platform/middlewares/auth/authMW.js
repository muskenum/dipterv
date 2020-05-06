const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.session.loggedin === 'undefined' || req.session.loggedin !== true) {
            res.redirect('/');
        }
        res.session = req.session;
        next();
    };
};