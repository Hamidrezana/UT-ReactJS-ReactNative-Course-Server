const Sequelize = require('sequelize')
const { Device } = require('../database')

function add(req, res) {
    Device.findOne({
        where: {
            deviceId: req.body.deviceId
        }
    })
        .then(device => {
            if (!device) {
                Device.create({
                    deviceId: req.body.deviceId,
                    brand: req.body.brand,
                    model: req.body.model,
                    systemVersion: req.body.systemVersion,
                })
                    .then(_device => {
                        return res.status(200).json({success: true});
                    })
                    .catch(err => {
                        console.log('err2', err)
                        return res.status(400).json({success: false});
                    })
            }
            return res.status(200).json({success: true});
        })
        .catch(err => {
            console.log('err3', err)
            return res.status(400).json({success: false})
        })
}

function getAll(req, res) {
    Device.findAll()
        .then(devices => {
            return res.status(200).json({success: true, message: devices});
        })
        .catch(err => {
            return res.status(400).json({success: false, message: err});
        })
}

module.exports = {
    add,
    getAll
}