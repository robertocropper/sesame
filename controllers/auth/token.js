const jwt = require("jsonwebtoken");
require("dotenv").config();

async function Token(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403);
      }

      const accessToken = jwt.sign(
        { user: user.rows[0].uid },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        //secure: process.env.NODE_ENV !== "development",
        //maxAge: 60 * 60,
        //sameSite: "strict",
        //path: "/",
      });
      res.json({ accessToken: accessToken });
    });
    res.status(200);
  } catch {
    res.status(500).send({ error: "Server error" });
  }
}

module.exports = { Token };
