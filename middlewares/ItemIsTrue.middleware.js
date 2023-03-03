const express = require("express");

const ItemIsTrueMiddleware = async (req,res,next)=>{
    let data = req.body
    try{
      const val =await CartModel.findOne({title:data.title,price:data.price,brand:data.brand});
      if(val)
      {
          res.send({"msg":"Item already in the cart",isItem:true})
      }
      else{
        next()
      }
    }
     catch(err){
        res.send("Error:",err.massege)
     }
}

module.exports = {
    ItemIsTrueMiddleware
}