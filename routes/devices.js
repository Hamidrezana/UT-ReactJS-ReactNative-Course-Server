var express = require('express')
var router = express.Router();
const deviceController = require('../controllers/device')

router.post('/add', deviceController.add);

module.exports = router;
