const Sequelize = require('sequelize')
const { User, Blog } = require('../database')
const requiredFields = ['firstName', 'lastName', 'email', 'password']
const Strings = require('../utils/Strings')
const Errors = require('../utils/Errors')


function allUser(req, res) {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(users => {
            return res.status(200).json({success: true, message: users});
        })
        .catch(err => {
            return res.status(400).json({success: false, message: err});
        })
}

function userBlogs(req, res) {
    // Blogs.findByPk(req.body.userId, {include: ['blogs']})
    //     .then(blogs => {
    //         return res.status(200).json({success: true, message: blogs});
    //     })
    //     .catch(err => {
    //         return res.status(400).json({success: false, message: err});
    //     })
    Blog.findAll({
        where: {
            userId: req.user.id // Extract from token
        }
    })
        .then(blogs => {
            return res.status(200).json({success: true, message: blogs});
        })
        .catch(err => {
            return res.status(400).json({success: false, message: err});
        })
}

module.exports = {
    allUser,
    userBlogs
}