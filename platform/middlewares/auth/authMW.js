const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        console.log("authMW");
        if (typeof req.session.loggedin === 'undefined' || req.session.loggedin !== true) {
            if (req.originalUrl === '/games') {
                return next();
            } else res.redirect('/');
        }
        res.locals.session = req.session;
        next();
    };
};