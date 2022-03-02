const pool = require("../../database");

async function DeleteProject(req, res) {
  const uid = req.params.uid;
  const pid = req.params.pid;
  try {
    const project = await pool.query(
      `DELETE FROM PROJECTS WHERE uid = $1 AND pid = $2 RETURNING *`,
      [uid, pid]
    );
    res.json({ deletedProject: project.rows });
    res.status(200);
  } catch (error) {
    res.status(500).send({ error: "Deleting this project didn't work" });
  }
}
module.exports = { DeleteProject };
