const requireOption = require('../requireOption');

module.exports = function (objectRepository, viewName) {
    return function (req, res) {
        res.render(viewName, res.locals);
        console.log('Render: ' + viewName);
        res.end('Template: ' + viewName);
    };
};