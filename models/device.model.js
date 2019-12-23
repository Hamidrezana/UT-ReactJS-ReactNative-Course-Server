module.exports = (sequelize, type) => {
    return sequelize.define('device', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            deviceId: {
                type: type.STRING,
                allowNull: false,
                unique: true
            },
            brand: {
                type: type.STRING,
                allowNull: false
            },
            model: {
                type: type.STRING,
                allowNull: false,
            },
            systemVersion: {
                type: type.STRING,
                allowNull: false
            },
            userId: {
                type: type.INTEGER
            }
        }
    )
}