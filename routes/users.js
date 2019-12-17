var express = require('express')
var router = express.Router();
const userController = require('../controllers/user')

router.get('/users', userController.allUser);
router.post('/blogs', userController.userBlogs);

module.exports = router;
