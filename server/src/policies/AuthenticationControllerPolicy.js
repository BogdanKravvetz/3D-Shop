//express middleware
const Joi = require('joi')

module.exports = {
    register(req,res,next){
        const schema = Joi.object({
            email: Joi.string().email(),
            password:Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{4,32}$')
            ),
            firstName: Joi.string().alphanum().min(3).max(30).required(),
            lastName: Joi.string().alphanum().min(3).max(30).required(),
            phone: Joi.string().min(3).max(30).required(),
            isVerified: Joi.boolean(),
            isAdmin: Joi.boolean(),
            isDeleted: Joi.boolean()

        })
        const {error,value} = schema.validate(req.body)  // eslint-disable-line no-unused-vars

        if(error){
            switch(error.details[0].context.key){
                case 'email':
                    res.status(400).send({error:'Insert valid email adress'})
                break;
                case 'password':
                    res.status(400).send({error:'Password must contain only letters and numbers, 4 min char, 32 max'})
                break;
                default:
                    res.status(400).send({error:'Invalid information?'})
            }
        }else{
            next()
        }
    }
}