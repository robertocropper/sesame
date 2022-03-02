const pool = require("../../database");

async function editUser(req, res) {
  const { displayName, type } = req.body;
  try {
    const editedUser = await pool.query(
      `UPDATE users SET
        displayName = $1,
        type = $2
        WHERE uid = $3`,
      [displayName, type, req.user]
    );
    res.status(200);
    res.json({ editedUser: editedUser.rows[0] });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

module.exports = { editUser };
