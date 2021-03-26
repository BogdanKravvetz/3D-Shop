const passport = require('passport')

module.exports = function (req,res,next) {
    passport.authenticate('jwt', function (err,user) {
        if(err || !user){
            res.status(401).send({
                error: 'You can not access this'
            })
        }else{
            req.user = user
            next()
        }
    })(req,res,next)
}