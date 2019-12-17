module.exports = (sequelize, type) => {
    return sequelize.define('user', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type: type.STRING,
                allowNull: false
            },
            lastName: {
                type: type.STRING,
                allowNull: false
            },
            email: {
                type: type.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: type.STRING,
                allowNull: false
            }
        },
        {
            instanceMethods: {
                toJSON: function () {
                    var values = Object.assign({}, this.get());
                    delete values.password;
                    return values;
                }
            }
        }
    )
}