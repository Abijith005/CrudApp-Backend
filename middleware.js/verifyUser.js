const token=require('jsonwebtoken')

module.exports={
    verifyUser:(req,res,next)=>{
       const token=req.cookies.token
       console.log(token,"tokennnnnnnnnnnnnn");
       next()
   }

}