const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const GameModel = requireOption(objectRepository, 'GameModel');
    return function (req, res, next) {
        if (typeof res.locals.game==='undefined'){
            return next();
        }
        res.locals.game.remove((err)=>{
            if (err){
                return next(err);
            }
            res.redirect(`/users/${res.locals.user._id}/games`);
        });
    };
};