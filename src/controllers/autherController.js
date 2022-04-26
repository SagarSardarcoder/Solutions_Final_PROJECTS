const autherModel = require("../model/authorModel")

let createAuther = async function(req,res){
    let data = req.body
    let list = await autherModel.create(data)
    res.send({data:list})
}

module.exports.createAuther=createAuther