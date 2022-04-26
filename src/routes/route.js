const express = require('express');
const router = express.Router();
const autherController =require('../controllers/autherController')

router.post('/createAuther',autherController.createAuther)
router.post('/createBlog',autherController.createBlog)
router.get('/getBlogs',autherController.getBlogs)





module.exports = router;