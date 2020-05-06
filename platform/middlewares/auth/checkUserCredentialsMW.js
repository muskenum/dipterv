const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if ((typeof req.body.password === 'undefined') ||
            (typeof req.body.username === 'undefined')) {
            return next();
        } else if ((req.body.password === 'alma') && (req.body.username === 'admin')) {
            req.session.loggedin = true;
            req.session.userID = 69;
            return req.session.save((err) => {
                return res.redirect('/games');
            });
        } else {
            res.locals.error = 'Wrong username or password!'
            return next();
        }next();
    };
};