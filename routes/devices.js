var express = require('express')
var router = express.Router();
const deviceController = require('../controllers/device')

router.post('/add', deviceController.add)
router.post('/get-all', deviceController.getAll)

module.exports = router;
