const jwt = require("jsonwebtoken");
require("dotenv").config();

function Auth(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user.user.uid;
  } catch (error) {
    return res.sendStatus(401);
  }
  next();
}

module.exports = { Auth };
