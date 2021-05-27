// const Tag = require('../models/Tag');

module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        filePath: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        isCustom: DataTypes.BOOLEAN,
        isDeleted: DataTypes.BOOLEAN
    })
    Product.associate = function (models) {
        Product.belongsToMany(models.Tag, { through: models.ProductTag });
        models.Tag.belongsToMany(Product, { through: models.ProductTag });
    }

    return Product
}
