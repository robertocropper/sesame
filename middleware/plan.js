const jwt = require("jsonwebtoken");
const pool = require("../database");
require("dotenv").config();

async function Plan(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const uid = user.user.uid;
    const plan = user.user.plan;
    if (plan === null) {
      const projectCount = await pool.query(
        `SELECT * FROM PROJECTS WHERE uid = $1`,
        [uid]
      );
      /*
      if (projectCount.rows.length === 2) {
        throw error;
      }*/
    }
  } catch (error) {
    return res.status(401).send({
      error: "You need to upgrade your plan to create more than 2 projects",
    });
  }
  next();
}

module.exports = { Plan };
