module.exports = (sequelize, DataTypes)=> {

    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        filePath: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        isDeleted: DataTypes.BOOLEAN
    })
    return Product
}
