const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        res.locals.user = {
            _userID: "id1",
            Name: "Kim Jong-un",
            UserName: "NukeEmAll",
            Mail: "kim@dprk.kr",
            Pass: "alma",
            Country: "Demo Rep Kr"
        };
        return next();
    };
};