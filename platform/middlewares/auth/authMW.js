const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        /*if (typeof req.session.loggedin === 'undefined') {
            console.log("You are not logged in!");
            res.redirect('/');
        }*/
        next();
    };
};