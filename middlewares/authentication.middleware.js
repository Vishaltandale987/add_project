const jwt = require("jsonwebtoken");
require("dotenv").config();

const UsreAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.key, (err, decoded) => {
      if (decoded) {
        req.body.user=decoded.userID
        next();
      } else {
        res.send({ massege: "Please Login","error":err });
      }
    });
  } else {
    res.send({ massege: "Please Login" });
  }
};

module.exports = {
  UsreAuthMiddleware,
  };
