const pool = require("../../database");
require("dotenv").config();

async function getUser(req, res) {
  try {
    const user = await pool.query("SELECT * FROM users WHERE uid = $1", [
      req.user,
    ]);
    res.json({ user: user.rows[0] });

    if (!user) {
      return res.status(404);
    }
  } catch (error) {
    res.status(500);
  }
}

module.exports = { getUser };
