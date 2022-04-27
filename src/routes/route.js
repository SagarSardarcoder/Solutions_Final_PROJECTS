const express = require('express');
const router = express.Router();
const autherController = require('../controllers/autherController')
let blogController = require('../controllers/blogController')

router.post('/createAuther', autherController.authorCreate)
router.post('/createBlog', blogController.createBlog)
router.get('/getBlogs', blogController.getBlogs)
router.put('/blogs/:blogId', blogController.putBlogs)
router.delete('/blogs/:blogId', blogController.deleted)
router.delete('/blogs', blogController.queryDeleted)






module.exports = router;