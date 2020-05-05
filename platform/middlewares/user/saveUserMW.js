/**
 * Updates or creates a user in the database, using POST parameters
 * If the requested user exists, the middleware updates it, otherwise it creates a new entity.
 * Redirects to the user's profile if successful.
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const UserModel = requireOption(objectRepository, 'UserModel');
    return function (req, res, next) {
        if ((typeof req.body.mail === 'undefined') ||
            (typeof req.body.name === 'undefined') ||
            (typeof req.body.pass === 'undefined') ||
            (typeof req.body.username === 'undefined') ||
            (typeof req.body.country === 'undefined')) {
            return next();
        }
        if (typeof res.locals.user === 'undefined') {
            res.locals.user = new UserModel();
        }
        res.locals.user.mail = req.body.mail;
        res.locals.user.name = req.body.name;
        res.locals.user.pass = req.body.pass;
        res.locals.user.username = req.body.username;
        res.locals.user.country = req.body.country;
        res.locals.user.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(`/users/${res.locals.user._id}`);
        });
    };
};