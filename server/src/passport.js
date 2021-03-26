const passport = require('passport')
const {User} = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtratJwt = require('passport-jwt').ExtractJwt

const config = require('./config/dbconfig')

passport.use(
    new JwtStrategy({
        //will verifiy if the token that come in is valit
        jwtFromRequest: ExtratJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.authentication.jwtSecert
    }, async function (jwtPayload,done) {
        try {
            const user = await User.findOne({
                where: {
                    id: jwtPayload.id
                }
            })
            if(!user){
                return done(new Error(),false)
            }
            return done(null, user)
        } catch (err) {
            return done(new Error(),false)
        }
    })
)
module.exports = null