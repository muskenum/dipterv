/**
 * Gets one user from the database using the :userid parameter.
 * Saves the result to res.locals.user.
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const UserModel = requireOption(objectRepository, 'UserModel');
    return function (req, res, next) {
        console.log("getUserMW");
        let actualID = req.params.userid;
        if (typeof req.params.userid !== 'undefined') {
            actualID = req.params.userid;
        } else if (typeof res.locals.game !== 'undefined') {
            actualID = res.locals.game._owner;
        } else if (typeof res.locals.lobby !== 'undefined') {
            actualID = res.locals.lobby._creator;
        } else if (typeof res.locals.session !== 'undefined') {
            console.log(res.locals.session.userID);
            actualID = res.locals.session.userID;
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