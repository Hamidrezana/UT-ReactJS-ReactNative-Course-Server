const Sequelize = require('sequelize')
const UserModel = require('../models/user.model')
const BlogModel = require('../models/blog.model')
const DeviceModel = require('../models/device.model')
// const sequelize = new Sequelize('reactCourseDB', 'hamidreza', '', {
//     host: 'localhost',
//     dialect: 'postgres',
// })
const sequelize = new Sequelize('postgres://lkddxxrdsufbew:42f43d50ee962c018615163581fb0f43e9dfd9af2de2cf45f2d76551211fe251@ec2-174-129-255-7.compute-1.amazonaws.com:5432/d7f0d1glfadm2j');


const User = UserModel(sequelize, Sequelize)
const Blog = BlogModel(sequelize, Sequelize)
const Device = DeviceModel(sequelize, Sequelize)
Blog.belongsTo(User, {foreignKey: 'userId', as: 'user'});
Device.belongsTo(User, {foreignKey: 'userId', as: 'user'})
User.hasMany(Blog, {as: 'blogs'});
sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = {
    User,
    Blog,
    Device
}