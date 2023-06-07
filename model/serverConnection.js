const mongoose=require('mongoose')


function db(){
    mongoose.connect('mongodb://127.0.0.1:27017/crudAngular').then(()=>{
        console.log("server connected !!");
    })
}

module.exports=db