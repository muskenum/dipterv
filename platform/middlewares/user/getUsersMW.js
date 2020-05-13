/**
 * Gets all users from the database and puts them on res.locals.users.
 *
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const UserModel = requireOption(objectRepository, 'UserModel');
    return function (req, res, next) {
        console.log("getUsersMW");
        UserModel.find({}, (err, users) => {
            if (err) {
                return next(err);
            }
            res.locals.users = users;
            return next();
        });
    };
};