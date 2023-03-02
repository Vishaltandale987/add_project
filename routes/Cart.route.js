const express = require("express");
const jwt = require("jsonwebtoken");
const { CartModel } = require("../model/cart.model");

const CartRouter = express.Router();


CartRouter.get("/",async(req,res)=>{
    // console.log(req, "am")
    const token = req.headers.authorization;
    const {userID} = jwt.verify(token,process.env.key);
    try {
        const product=await CartModel.find({user:userID})
        // console.log(product)
        res.send(product)
    
    } 
    catch (err) {
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
})


CartRouter.post("/post", async (req, res) => {
    let data = req.body

    try{
      const val =await CartModel.findOne({title:data.title,price:data.price,brand:data.brand});
      if(val)
      {
          res.send({"msg":"Item already in the cart",isItem:true})
      }
      const Product = new CartModel(data);
      await Product.save()
      res.send({ "msg": "New Product has been created"});
    }
    catch(err){
     res.send({"Error":err})
    }
   
  
  });
  
  
  
  
  CartRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try{
      await CartModel.findByIdAndDelete({ _id: id })
      res.send({ massege: `Product ${id} has been deleted` });
    }
    catch(err){
      res.send({"msg":"Something went wrong","Error":err})
    }
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
  