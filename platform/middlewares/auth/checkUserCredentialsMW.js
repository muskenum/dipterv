const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const UserModel = requireOption(objectRepository, 'UserModel');
    return function (req, res, next) {
        if ((typeof req.body.username === 'undefined') ||
            (typeof req.body.pass === 'undefined')) {
            return next();
        }
        else {
            UserModel.findOne({username: req.body.username, pass: req.body.pass}, (err, user) => {
                if (err || !user) {
                    res.locals.error = 'Wrong username or password!';
                    console.log("Wrong username or password!");
                    return next(err);
                }
                req.session.loggedin = true;
                req.session.user = user;
                return req.session.save((err) => {
                    return res.redirect('/games');
                });
            });
        }
    };
};