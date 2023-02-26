const mongoose = require("mongoose")

const BlockSchema = mongoose.Schema({
    
 
    email:String,
    
},{
    versionKey:false,
    timestamps:true
})

const BlockModel=mongoose.model("block",BlockSchema)
module.exports={
    BlockModel
}

   


