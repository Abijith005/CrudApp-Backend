const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const adminSchema=mongoose.model('admin',schema)
module.exports=adminSchema