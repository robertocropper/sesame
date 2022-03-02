const pool = require("../../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function SignUp(req, res) {
  try {
    const { displayName, email, password } = req.body;

    const userExists = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (userExists.rows.length !== 0) {
      return res.status(401).send({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await pool.query(
      `INSERT INTO users (displayName, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [displayName, email, hashedPassword]
    );

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

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      //maxAge: 360000,
      sameSite: "strict",
      path: "/",
    });

    res.json({
      user: user.rows[0],
      accessToken: accessToken,
    });
    res.status(200);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
}

module.exports = { SignUp };
