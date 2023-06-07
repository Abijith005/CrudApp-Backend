const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    profilePic:{
        type:Object,
        required:false
    }
})

const userSchema=mongoose.model('user',schema)
module.exports=userSchema

