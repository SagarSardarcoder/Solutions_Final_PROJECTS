const express = require('express');
const router = express.Router();
const autherController = require('../controllers/autherController')
let blogController = require('../controllers/blogController')

//////////////////////phase-1 ///////////////////////

router.post('/createAuther', autherController.authorCreate)
router.post('/createBlog', blogController.createBlog)
router.get('/getBlogs', blogController.getBlogs)
router.put('/blogs/:blogId', blogController.putBlogs)
router.delete('/blogs/:blogId', blogController.deleted)
router.delete('/blog', blogController.queryDeleted)

//////////////////phase-2////////////////////

router.post('/login', autherController.loginAuthor)






module.exports = router;