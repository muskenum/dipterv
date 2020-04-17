const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        res.locals.users = [
            {
                _userID: "id1",
                Name: "Kim Jong-un",
                UserName: "NukeEmAll",
                Mail: "kim@dprk.kr",
                Pass: "alma",
                Country: "Demo Rep Kr"
            },
            {
                _userID: "id2",
                Name: "Donald Trombita",
                UserName: "biggyBoi",
                Mail: "kim@dprk.kr",
                Pass: "alma",
                Country: "USA"
            },
        ];
        next();
    };
};