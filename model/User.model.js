const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    password:String,
    email:String,
    age:Number,
    number:Number,
    gender: "male" | "female" | "other"
},{
    versionKey:false,
    timestamps:true
})

const UserModel=mongoose.model("user",userSchema)
module.exports={
    UserModel
}

    // "name":"",
    // "password":"",
    // "email":"",
    // "avtar":"",
    // "age":"",
    // "gender":""


