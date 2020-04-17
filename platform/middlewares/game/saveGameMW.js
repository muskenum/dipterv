const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if ((typeof req.body.Name === 'undefined') ||
            (typeof req.body.Desc === 'undefined') ||
            (typeof req.body.File == 'undefined') ||
            (typeof req.body._Owner === 'undefined')) {
            return next();
        }
        console.log(req.body);
        res.redirect('/games/:gameid');
    };
};