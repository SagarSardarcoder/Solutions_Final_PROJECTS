const autherModel = require("../model/authorModel")
const blogsModel = require("../model/blogsModel")
const moment = require('moment')

let createBlog = async function(req, res) {
    try {
        let data = req.body
        let id = data.authorId

        if (!id) return res.status(400).send({ status: false, msg: "authorId is required" })
        if(!data.title) res.status(400).send({ status: false, msg: "title is required" })
        if(!data.body) res.status(400).send({ status: false, msg: "body is required" })
        let findAuthor = await autherModel.findById(id)
        if (!findAuthor) return res.status(404).send({ msg: "authorId invalid" })
        if (content.isPublished == true)
        content["publishedAt"] = new Date();
        let blog = await blogsModel.create(data)
        res.status(201).send({ status: true, data: blog })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ error: err.message })
    }
}
const getBlogs = async function(req, res) {

    try {

        let data = req.query;
        let filter = { $and: [{ isDeleted: false, isPublished: true, ...data }] };
        // console.log(filter);
        let blogsPresent = await blogsModel.find(filter)

        if (blogsPresent.length === 0) {
            res.status(404).send({ msg: "No blogs is present" })
        } else {
            res.status(200).send({ status: true, data: blogsPresent })
        }

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

const putBlogs = async function(req, res) {
    try {
        let data = req.body
        let id = req.params.blogId

        // if (!id) return res.status(400).send({ status: false, msg: "blogid is required" })
        // let findblog = await blogsModel.findById(id)
        // console.log(findblog)
        // if (!findblog) return res.status(404).send({ msg: "blogid invalid" })
        if (findblog.isDeleted == true) return res.status(404).send({ msg: "Blog is already deleted " })
        if (findblog.isDeleted == false) {
            let updatedBlog = await blogsModel.findOneAndUpdate({ _id: id }, {
                $set: {
                    title: data.title,
                    body: data.body,
                    category: data.category,
                    publishedAt: moment().format(),
                    isPublished: true
                },
                $push: {
                    tags: req.body.tags,
                    subcategory: req.body.subcategory
                }
            }, { new: true, upsert: true })
            return res.status(200).send(updatedBlog)
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
let deleted = async function(req, res) {
    try {
        let id = req.params.blogId
        if (!id) return res.status(404).send({ status: false, msg: "blog id is required" })
        let idvalidation = await blogsModel.findById(id)
        if (!idvalidation) return res.status(404).send({ status: false, msg: "invalid blog id" })
        if (idvalidation.isDeleted == true) return res.status(404).send({ status: false, msg: " blog is allready deleted" })
        if (idvalidation.isDeleted == false) {
            let deletion = await blogsModel.findOneAndUpdate({ _id: id }, {$set:{ isDeleted: true ,deletedAt: moment().format()}})
            return res.status(200).send({ status: true, msg: "blog is deleted successfully" })
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

let queryDeleted = async function(req, res) {
    try {
        let Data = req.query
        let filter = {...Data}
        if (!Data) return res.status(404).send({ status: false, msg: "query params is not given " })
        let blogvalidation = await blogsModel.findOne(filter)
        if (!blogvalidation) return res.status(404).send({ status: false, msg: "blog does not exist" })
        if (blogvalidation.isDeleted == true) return res.status(404).send({ status: false, msg: " blog is allready deleted" })
        if (blogvalidation.isDeleted == false) {
            // let idList = blogvalidation._id
            // console.log(idList)
            let deletion = await blogsModel.findOneAndUpdate(filter,{ $set:{ isDeleted: true ,deletedAt: moment().format()}})
            return res.status(200).send({ status: true, msg: "blog is deleted successfully" })
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }


}

module.exports.queryDeleted = queryDeleted
module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.putBlogs = putBlogs
module.exports.deleted = deleted 