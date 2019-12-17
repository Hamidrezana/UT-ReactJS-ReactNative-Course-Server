module.exports = (sequelize, type) => {
    return sequelize.define('blog', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: type.STRING,
        text: type.STRING,
        userId: {
            type: type.INTEGER
        }
    })
}