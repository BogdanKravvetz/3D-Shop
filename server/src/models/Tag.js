module.exports = (sequelize, DataTypes)=> {

    const Tag = sequelize.define('Tag', {
        name: DataTypes.STRING,
        relevance: DataTypes.INTEGER,
        isDeleted: DataTypes.BOOLEAN
    })
    return Tag
}
