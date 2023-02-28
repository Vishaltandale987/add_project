
const express = require("express");
const { CartModel } = require("../model/cart.model");

const CartRouter = express.Router();


CartRouter.get("/",async(req,res)=>{
    console.log(req, "am")
    try {
        const product=await CartModel.find()
        console.log(product)
        res.send(product)
    
    } 
    catch (err) {
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
})


CartRouter.post("/post", async (req, res) => {
    let data = req.body
    const Product = new CartModel(data)
    await Product.save()
    res.send({ massege: "New Product has been created", data });
  
  });
  
  
  
  
  CartRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    await CartModel.findByIdAndDelete({ _id: id })
    res.send({ massege: `Product ${id} has been deleted` });
  
  });


  CartRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
      await CartModel.findByIdAndUpdate({ _id: id }, data)
      res.send({ massege: `Product ${id} has been update. ` });

     
    } catch (error) {
      res.send({ massege: `Product not able to update.`, error });
      
    }
  
  
  });

module.exports = {
    CartRouter,
  };
  