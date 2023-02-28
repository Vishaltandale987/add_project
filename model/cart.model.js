const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    title: String,
    price: Number,
    quantity: Number,
    brand: String,
    category: String,
    sub_category: String,
    images: Array
},{
    versionKey:false
})

const CartModel=mongoose.model("Cart",cartSchema)
module.exports={
    CartModel
}