/**
 * Gets one user from the database using the :userid parameter.
 * Saves the result to res.locals.user.
 */
const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const UserModel = requireOption(objectRepository, 'UserModel');
    return function (req, res, next) {
        UserModel.findOne({_id: req.params.userid}, (err, user) => {
            if (err || !user) {
                next(err);
            }
            res.locals.user = user;
            return next();
        });
    };
};