const {Product} = require('../models')
const {Tag} = require('../models')
module.exports = (sequelize, DataTypes)=> {

    const ProductTag = sequelize.define('ProductTag', {
        ProductId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: 'id'
            }
        },
        TagId: {
            type: DataTypes.INTEGER,
            references: {
                model: Tag,
                key: 'id'
            }
        }
    })

    // Product.belongsToMany(Tag, {through: ProductTag})
    // Tag.belongsToMany(Product, {through: ProductTag})
    return ProductTag
}