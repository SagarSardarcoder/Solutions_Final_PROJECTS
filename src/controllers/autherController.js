const authorModel = require('../model/authorModel');
const emailvalidator = require("email-validator");
const jwt = require('jsonwebtoken')

const authorCreate = async function(req, res) {
    try {
        let content = req.body;
        let email = req.body.email;
        if(!email) return res.send({msg:"email is required"})
        if(!content.fname) return res.send({msg:"fname is required"})
        if (emailvalidator.validate(email)) {
            let isPresent = await authorModel.find({ email: email });

            if (isPresent.length === 0) {
                let data = await authorModel.create(content);
                res.status(201).send({ msg: data });
            } else return res.send({ msg:"author is already present with this email id"})
        } else {
            return res.status(400).send("Invalid Email")
        }
    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

const loginAuthor = async function(req, res) {
    try {
        let userName = req.body.email
        let password = req.body.password
        if (!userName && !password) return res.status(404).send({ status: false, msg: "please Enter userName And Password" })
        let Author = await authorModel.findOne({ $and: [{ email: userName }, { password: password }] })
        if (!Author) return res.status(404).send({ status: false, msg: "Author is not found" })

        let token = jwt.sign({ authorId: Author._id.toString() }, 'Group-46')
        res.setHeader("x-api-key", token)
        res.status(200).send({ msg: token })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ error: err.message })
    }

}


module.exports.authorCreate = authorCreate;
module.exports.loginAuthor = loginAuthor