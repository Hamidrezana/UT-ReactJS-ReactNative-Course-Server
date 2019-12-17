const Sequelize = require('sequelize')
const { User, Blog } = require('../database')
const requiredFields = ['firstName', 'lastName', 'email', 'password']
const Strings = require('../utils/Strings')
const Errors = require('../utils/Errors')

function addBlog(req, res) {
    Blog.create({
        title: req.body.title,
        text: req.body.text,
        userId: req.user.id, // extract from token
    })
        .then(blog => {
            return res.status(200).json({success: true, message: blog});
        })
        .catch(err => {
            if (err instanceof Sequelize.UniqueConstraintError) {
                return res.status(200).json({success: false, message: 'already added'});
            } else {
                return res.status(400).json({success: false, message: err});
            }
        })
}

function allBlogs(req, res) {
    Blog.findAll({
        include: 'user'
    })
        .then(blogs => {
            return res.status(200).json({success: true, message: blogs});
        })
        .catch(err => {
            return res.status(400).json({success: false, message: err});
        })
}

function getBlog(req, res) {
    Blog.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(blog => {
            if (blog) res.status(200).json({success: true, message: blog})
            else res.status(400).json({success: false, message: 'no found'})
        })
        .catch(err => res.status(400).json({success: false, message: err}))
}

module.exports = {
    addBlog,
    allBlogs,
    getBlog
}