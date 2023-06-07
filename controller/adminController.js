const adminSchema = require('../model/adminSchemas')
const userSchema = require('../model/userSchemas')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports = {

    adminLogin: async (req, res) => {
        try {
            const { email, password } = { ...req.body }
            const admin = await adminSchema.findOne({ email: email })
            if (admin) {
                if (password == admin.password) {
                    const token = jwt.sign({ _id: admin._id }, "adminSecret")
                    const users = await userSchema.find().lean()
                    console.log(users, "dsgfysghjshjshjhjshjshjks");
                    res.json({ access_token: token, users: users, message: "Login Successful" })
                }
                else {
                    res.json({ message: 'Incorrect Password' })
                }
            }
            else {
                res.json({ message: 'Invalid Admin' })
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    getUsers: async (req, res) => {
        try {
            if (!req.params.input) {
                const users = await userSchema.find().lean()
                return res.json({ users })
            }
            const input = req.params.input
            const users = await userSchema.find({ name: { $regex: input, $options: 'i' } }).lean()
            if (users) {
                return res.json({ users: users })
            }

            return res.json({ users: users })


        } catch (e) {
            console.log(e);
        }
    },

    deleteUser: async (req, res) => {
        try {
            console.log('delete');
            const _id = req.params.user_id
            await userSchema.deleteOne({ _id: _id })
            const users = await userSchema.find().lean()
            return res.json({ users: users })

        } catch (e) {
            console.log(e);
        }

    },

    createUser: async (req, res) => {
        try {
            const { name, email } = { ...req.body }
            const password = await bcrypt.hash(req.body.password, 10)
            await userSchema.create({ name, email, password })
            const users=await userSchema.find().lean()
            return res.json({ users: users })


        } catch (e) {
            console.log(e);
        }
    },


    getUserDetails:async(req,res)=>{
        try {
            const user_id=req.params.user_id
            const userDetails=await userSchema.findOne({_id:user_id})
            return res.json(userDetails)
        } catch (e) {
            
        }
    },

    editUser:async (req, res) => {
        try {
            const { name, email,_id } = { ...req.body }
            const updateFields={name,email}
            const password =req.body.password?await bcrypt.hash(req.body.password, 10):''
            password?updateFields.password=password:''
            await userSchema.findByIdAndUpdate({_id:_id},{$set:{...updateFields}})
            const users=await userSchema.find().lean()
            return res.json({users:users})
        } catch (e) {
            console.log(e);

        }   

    }

}