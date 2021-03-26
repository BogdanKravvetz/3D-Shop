module.exports = (sequelize, DataTypes)=> {

    const Color = sequelize.define('Color', {
        name: DataTypes.STRING,
        hex: DataTypes.STRING,
        isDeleted: DataTypes.BOOLEAN
    })
    return Color
}
