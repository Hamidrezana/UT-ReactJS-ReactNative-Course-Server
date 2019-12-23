var express = require('express')
var router = express.Router();
const blogController = require('../controllers/blog')

router.post('/add', blogController.addBlog);
router.post('/remove', blogController.removeBlog)
router.get('/posts', blogController.allBlogs);
router.get('/post/:id', blogController.getBlog);

module.exports = router;
