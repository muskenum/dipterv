/**
 * Gets one user from the database using the :userid parameter.
 * Saves the result to res.locals.user.
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const UserModel = requireOption(objectRepository, 'UserModel');
    let actualID = "";
    return function (req, res, next) {
        if (typeof req.params.userid !== 'undefined') {
            actualID = req.params.userid;
        } else if (typeof res.locals.game !== 'undefined') {
            actualID = res.locals.game._owner;
        } else if (typeof res.locals.lobby !== 'undefined') {
            actualID = res.locals.lobby._creator;
        }
        UserModel.findOne({_id: actualID}, (err, user) => {
            if (err || !user) {
                return next(err);
            }
            res.locals.user = user;
            return next();
        });
    };
};