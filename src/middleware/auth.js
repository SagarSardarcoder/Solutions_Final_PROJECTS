const req = require('express/lib/request');
const jwt = require('jsonwebtoken');
const blogsModel = require('../model/blogsModel');

const authentication = async function (req, res, next) {
    try {

        let token = req.headers["X-API-KEY"]
        if (!token) token = req.headers["x-api-key"]
        if (!token) return res.status(401).send({ status: false, msg: "token is required" })

        let decodToken = jwt.verify(token,"Group-46");
        if (!decodToken) return res.status(401).send({ status: false, msg: "Token is not verified" })
        next()
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
const authorization = async function (req, res, next) {
    try {
        let token = req.headers["X-API-KEY"]
        if (!token) token = req.headers["x-api-key"]
        if (!token) return res.status(404).send({ status: false, msg: "token is required" })

        let data = req.params.blogId
        let blog = await blogsModel.findById(data)
        // console.log(blog.authorId)
        let decodToken = jwt.verify(token, "Group-46");
        // console.log(decodToken.authorId)
        if (blog.authorId.toString() === decodToken.authorId) {
            next()
        } else {
            return res.status(401).send({ status: false, msg: "You are not authorized" })
        }

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
const authorizationQuery = async function (req, res, next) {
   try{ 
       let token = req.headers["X-API-KEY"]
    if (!token) token = req.headers["x-api-key"]
    if (!token) return res.status(404).send({ status: false, msg: "token is required" })

    let queryData = req.query
    let blog = await blogsModel.findOne({...queryData})
    let decodToken = jwt.verify(token, "Group-46");

    if (blog.authorId.toString() === decodToken.authorId) {
        next()
    } else {
        return res.status(401).send({ status: false, msg: "You are not authorized" })
    }
}catch (err) {
    res.status(500).send({ status: false, msg: err.message });
}
}

module.exports.authentication = authentication
module.exports.authorization = authorization
module.exports.authorizationQuery = authorizationQuery