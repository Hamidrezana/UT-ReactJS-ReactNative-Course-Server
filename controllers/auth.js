const Sequelize = require('sequelize')
const { User, Blog } = require('../database')
const requiredFields = ['firstName', 'lastName', 'email', 'password']
const Strings = require('../utils/Strings')
const Errors = require('../utils/Errors')
var bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../configs/jwtConfig')
const saltRounds = 10;

const secret = config.secret

function register(req, res) {
    requiredFields.map(field => {
        if (!req.body[field]) {
            return res.status(400).json({success: false, message: `${Strings.fields[field]} اجباری است.`});
        }
    })
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        })
            .then(user => {
                delete user.dataValues.password
                const payload = {
                    id: user.id,
                    email: user.email
                }
                jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
                    if (err)
                        return res.status(500).json({ success: false, message: err });
                    return res.status(200).json({success: true, message: user, token: `${token}`})
                })
            })
            .catch(err => {
                if (err instanceof Sequelize.UniqueConstraintError) {
                    return res.status(200).json({success: false, message: Errors.alreadyAdded});
                } else {
                    return res.status(400).json({success: false, message: err});
                }
            })
    })
}

function login(req, res) {
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    delete user.dataValues.password
                    if (result) {
                        const payload = {
                            id: user.id,
                            email: user.email
                        }
                        jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
                            if (err)
                                return res.status(500).json({ success: false, message: err });
                            return res.status(200).json({success: true, message: user, token: `${token}`})
                        })
                    }
                    else
                        return res.status(200).json({success: false, message: 'password error'});
                })
            } else
                return res.status(200).json({success: false, message: 'no user'});
        })
}

module.exports = {
    register,
    login
}