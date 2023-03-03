const express=require("express")
const { connection } = require("./config/db")
const cors=require("cors")
const { UserRouter } = require("./routes/user.route")
const { ProductRouter } = require("./routes/product.route")
const { CartRouter } = require("./routes/Cart.route")
const { AdminUserRouter } = require("./routes/Adminuser.route")
const { UsreAuthMiddleware } = require("./middlewares/authentication.middleware")
const { BlockRouter } = require("./routes/Block.route")
const { ItemIsTrueMiddleware } = require("./middlewares/ItemIsTrue.middleware")
require("dotenv").config()



const app=express()

app.use(cors())
app.use(express.json())



//get
app.get("/", (req, res) => {
  res.send("Welcome to our Project.");
});

app.use("/users", UserRouter);
app.use("/products" , ProductRouter);
app.use(UsreAuthMiddleware)
app.use("/cart", ItemIsTrueMiddleware, CartRouter);
app.use("/admin" , AdminUserRouter );
app.use("/block" , BlockRouter );



app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected to db",process.env.port)
    } catch (error) {
        console.log(error)
    }
})