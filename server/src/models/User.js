const Promise = require('bluebird')
const bcryp = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user,options){ // eslint-disable-line no-unused-vars
    const SALT_FACTOR = 8
    if(!user.changed('password')){
        return;
    }
    return bcryp
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcryp.hashAsync(user.password,salt,null))
    .then(hash => {
        user.setDataValue('password',hash)
    })
}

module.exports = (sequelize, DataTypes)=> {

    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        phone: DataTypes.STRING,
        isVerified: DataTypes.BOOLEAN,
        isAdmin: DataTypes.BOOLEAN,
        isDeleted: DataTypes.BOOLEAN
    },
    {
        hooks:{
            // beforeCreate: hashPassword,
            // beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    })
    User.prototype.comparePassword = function (password){
        return bcryp.compareAsync(password, this.password)
    }
    return User
}
