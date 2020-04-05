const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        next();
    };
};