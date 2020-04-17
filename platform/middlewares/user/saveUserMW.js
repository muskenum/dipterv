const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if ((typeof req.body.Mail === 'undefined') ||
            (typeof req.body.Name === 'undefined') ||
            (typeof req.body.Pass === 'undefined') ||
            (typeof req.body.UserName == 'undefined') ||
            (typeof req.body.Country === 'undefined')) {
            return next();
        }
        console.log(req.body);
        res.redirect('/users/:userid');
    };
};