module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define('Order', {
        status: DataTypes.STRING,
        isDelivery: DataTypes.BOOLEAN,
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        isDeleted: DataTypes.BOOLEAN

    })
    Order.associate = function (models) {
        models.User.hasMany(Order)
        Order.belongsTo(models.User);
    }
    return Order
}