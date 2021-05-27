module.exports = (sequelize, DataTypes) => {

    const CartItem = sequelize.define('CartItem', {
        quantity: DataTypes.INTEGER,
        isDeleted: DataTypes.BOOLEAN

    })
    CartItem.associate = function (models) {
        models.Order.hasMany(CartItem)
        CartItem.belongsTo(models.Order, {
            foreignKey: {
                name:'OrderId',
                allowNull: true
            }
        });

        models.User.hasMany(CartItem)
        CartItem.belongsTo(models.User);

        models.Product.hasMany(CartItem);
        CartItem.belongsTo(models.Product);

        models.Color.hasMany(CartItem);
        CartItem.belongsTo(models.Color);
        
    }

    return CartItem
}