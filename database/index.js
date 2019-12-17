const Sequelize = require('sequelize')
const UserModel = require('../models/user.model')
const BlogModel = require('../models/blog.model')

const sequelize = new Sequelize('reactCourseDB', 'hamidreza', '', {
    host: 'localhost',
    dialect: 'postgres',
})

const User = UserModel(sequelize, Sequelize)
const Blog = BlogModel(sequelize, Sequelize)
Blog.belongsTo(User, {foreignKey: 'userId', as: 'user'});
User.hasMany(Blog, {as: 'blogs'});
sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = {
    User,
    Blog
}