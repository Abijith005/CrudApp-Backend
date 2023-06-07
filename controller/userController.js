const userSchema = require('../model/userSchemas');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const e = require('express');




module.exports = {
    userSignUP: async (req, res) => {
        try {
            let { name, email, password } = { ...req.body }
            password = await bcrypt.hash(password, 10)
            const user = await userSchema.findOne({ email: email })
            if (user) {
                res.json({message: 'User Already Exists' })
            }
            else {
                const user = await userSchema.create({ name, email, password })
                const token = jwt.sign({ _id: user._id}, 'secret')

                return res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: 'none'
                }).json({access_token:token, message: 'Registration Successful !!' })

            }

        }
        catch (e) {
            console.log('error', e);
        }

    },


    userLogin:async(req,res)=>{
        try{
            const{email,password}={...req.body}
           const user=await userSchema.findOne({email:email})
           if (user) {
          const comparison=await bcrypt.compare(password,user.password)
          if (comparison) {
            const token=jwt.sign({_id:user._id},'secret')
            const userDet=await userSchema.findOne({email:email})
            console.log(userDet);
            return res.json({access_token:token,email:userDet.email,name:userDet.name,profilePic:userDet.profilePic,message:'Login Successful !!'})
          }
          else{
            res.json({message:"Incorrect Password"})
          }
 
           }
           else{
            res.json({message:'Invalid user'})
           }

        }
        catch(err){
console.log('Error :',err);
        }
    },


    editProfile:async(req,res)=>{
        try{
            console.log(req.body,'adadagfaggaga',req.body.name);
    const name=req.body.name
    const image=req.files?.profilePic?.[0]
    const email =req.body.email   
    let updateFields={}
    name?updateFields.name=name:''
    image?updateFields.profilePic=image:"" 
    await userSchema.updateOne({email:email},{$set:{...updateFields}})
    const user=await userSchema.findOne({email:email})
    return res.json(user)

        }
        catch(e){
            console.log(e);
        } 
 
    },

    getUserDetails:async(req,res)=>{
        try {
            const user_id=req.params.user_id
            const user=await userSchema.findOne({_id:user_id})
            console.log(user,'user');
            const {name,email,password,profilePic}=user
            console.log(name,email,password,profilePic,'name')
            return res.json({name:name,email:email,password:password,profilePic:profilePic})
        } catch (e) {
            console.log(e);
        }
    }
} 