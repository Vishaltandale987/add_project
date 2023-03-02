const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./../model/User.model");
require("dotenv").config()

const UserRouter = express.Router();

//all users

UserRouter.get("/", async (req, res) => {

  const notes = await UserModel.find()
  res.send(notes);
});

//register

UserRouter.post("/register", async (req, res) => {
  const { name, email, password, avatar, age, gender } = req.body;

  let logindata = await UserModel.find({ email: email })
  try {
    if (logindata.length !== 0) {
     return res.send({ massege: "User Already Exist" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.send({ massege: "something went wrong", error: err.message });
      }

      else {
        const user = new UserModel({ name, email, password: hash, avatar, age, gender });
        await user.save();
        res.send({ massege: "New user register" });
      }
    });
  } catch (error) {
    res.send({ massege: "something went wrong" });
  }
});

//login

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);

          res.send({ massege: "login successful", token: token });
        } else {
          res.send({ massege: "something went wrong" });
        }
      });
    } else {
      res.send({ massege: "wrong coredentials" });
    }
  } catch (error) {
    res.send({ massege: "something went wrong"});
  }
});

UserRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  await UserModel.findByIdAndDelete({_id:id})
  res.send({ massege: `Product ${id} has been deleted` });
});

module.exports = {
  UserRouter,
};
