const express = require('express');
const router = express.Router();
const autherController =require('../controllers/autherController')

router.post('/createAuther',autherController.createAuther)





module.exports = router;