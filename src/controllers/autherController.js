const autherModel = require("../model/authorModel")
const blogsModel = require("../model/blogsModel")

let createAuther = async function(req,res){
    let data = req.body
    let list = await autherModel.create(data)
    res.send({data:list})
}
let createBlog = async function(req,res){
    let data = req.body
    let id = data.authorId

    if(!id)return res.status(400).send({status:false,msg:"authorId is required"})
    let findAuthor = await autherModel.findById(id)
    if(!findAuthor)return res.status(404).send({msg:"authorId invalid"})

   let blog = await blogsModel.create(data)
   res.status(201).send({status:true,data:blog})
}
let getBlogs = async function(req,res){
    let findBlogs = await blogsModel.find({$and:[{isDeleted:false},{isPublished:true}]})
    // res.send({data:findBlogs})
    let filterName = req.query.fi

}

module.exports.createAuther=createAuther
module.exports.createBlog=createBlog
module.exports.getBlogs=getBlogs