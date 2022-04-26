const mongoose = require('mongoose')
require('mongoose-type-email');
const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: mongoose.SchemaTypes.Email,


    //     type: String,
    //     trim: true,
    //     lowercase: true,
    //     unique: true,
    //     required: true,
    //     validate: [validateEmail, 'Please fill a valid email address'],
    //    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Author', authorSchema)