const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlockModel } = require("../model/block.model");

const BlockRouter = express.Router();

//all users
BlockRouter.get("/", async (req, res) => {

  const notes = await BlockModel.find()
  res.send(notes);
});

//register

BlockRouter.post("/register", async (req, res) => {
  const { email } = req.body;
  let logindata = await BlockModel.find({ email: email })
  try {
    if (logindata.length !== 0) {
      return res.send({ massege: " User Already Ban" });
    } else {
      const user = new BlockModel({ email });
      await user.save();
      res.send({ massege: "New user has been ban" });
    }
  } catch (error) {
    res.send({ massege: "something went wrong" });
  }
});

BlockRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  await BlockModel.findByIdAndDelete({ _id: id })
  res.send({ massege: `Product ${id} has been been remove from ban list.` });
});

module.exports = {
  BlockRouter,
};
