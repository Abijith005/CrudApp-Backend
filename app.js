// const express=require('express')
// const createError=require('http-errors')
// const path=require('path')
// const cookieParser=require('cookie-parser')
// const logger=require('morgan')
// const cors=require('cors')
// const userRouter=require('./routes/userRoutes')
// const adminRouter=require('./routes/adminRoutes')
// const db=require('./model/serverConnection')



// const app=express()
// db()
// app.use(express.urlencoded({extended:true}))
// app.use(logger('dev'))
// app.use(express.json())
// app.use(cookieParser())
// app.use(express.static(path.join(__dirname,'public')))
// app.use(cors({origin:['http://localhost:3000'],credentials:true}))
// // app.use('/',userRouter)
// // app.use('/admin',adminRouter)



const express=require('express')
const path=require('path')
const cookieParser=require('cookie-parser')
const logger=require('morgan')
const cors=require('cors')
const db = require('./model/serverConnection')
const adminRouter=require('./routes/adminRoutes')
const userRouter=require('./routes/userRoutes')


const app=express()
db()
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(cors({origin:['http://localhost:4200'],credentials:true}))
app.listen(3000,()=>{
    console.log("connected to port http://localhost:3000");
})
app.use('/',userRouter)
app.use('/admin',adminRouter)
module.exports=app