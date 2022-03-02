const pool = require("../../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function Login(req, res) {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      return res.status(401).send({ error: "Empty fields" });
    }

    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send({ error: "User does not exist" });
    }

    const compare = await bcrypt.compare(password, user.rows[0].password);

    if (!compare) {
      return res.status(401).send({ error: "User does not exist" });
    }

    const accessToken = jwt.sign(
      {
        user: {
          uid: user.rows[0].uid,
          plan: user.rows[0].plan,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    /*
    const refreshToken = jwt.sign(
      { user: user.rows[0].uid },
      process.env.REFRESH_TOKEN_SECRET
    );
    refreshTokens.push(refreshToken);
    */
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      //maxAge: 360000,
      sameSite: "strict",
      path: "/",
    });
    /*
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      //secure: process.env.NODE_ENV !== "development",
      //maxAge: 60 * 60,
      //sameSite: "strict",
      //path: "/",
    });
    */
    res.json({
      user: user.rows[0],
      accessToken: accessToken,
    });
    res.status(200);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

module.exports = { Login };
