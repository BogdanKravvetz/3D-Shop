const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/dbconfig')

function jwtSignUser(user){
    const ONE_WEEK = 60 *60 *7 *24
    return jwt.sign(user,config.authentication.jwtSecert, {
        expiresIn: ONE_WEEK
    })
}
module.exports = {
    async register(req,res) {
        try{
            const user = await User.create(req.body);
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch(err){
            res.status(400).send(
                {
                    error: 'This email already in use'
                }
            )
        }
        // res.send({message: 'user registered.' + req.body.email});
    },
    async login (req,res) {
        try{
            const {email,password} = req.body
            const user = await User.findOne({
                where:{
                    email: email
                }
            });
            if(!user){
                return res.status(403).send({
                    error: 'Invalid user information.'
                })
            }
            const isPasswordValid = await user.comparePassword(password)
            if(!isPasswordValid){
                return res.status(403).send({
                    error: 'Invalid user information.'
                })
            }
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch(err){
            res.status(500).send(
                {
                    error: 'Error at login.'
                }
            )
        }
    }
}