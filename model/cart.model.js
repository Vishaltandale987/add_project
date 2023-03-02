const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    title: String,
    price: Number,
    quantity: Number,
    brand: String,
    category: String,
    sub_category: String,
    images: Array,
    user:String
},{
    versionKey:false
})

const CartModel=mongoose.model("cart",cartSchema)
module.exports={
    CartModel
}