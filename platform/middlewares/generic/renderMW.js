const requireOption = require('../requireOption');

module.exports = function (objectRepository, viewName) {
    return function (req, res) {
        console.log('Render: ' + viewName);
        res.end('Template: ' + viewName);
    };
};