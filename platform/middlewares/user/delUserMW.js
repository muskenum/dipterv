/**
 * Removes a user from the database if it exists.
 * Redirects to the main page after that.
 */
const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }
        res.locals.user.remove((err) => {
            if (err) {
                return next(err);
            }
        });
        return res.redirect('/');
    };
};