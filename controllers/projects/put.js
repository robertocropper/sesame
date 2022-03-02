const pool = require("../../database");

async function editProject(req, res) {
  const {
    clientObjective,
    objectiveOption,
    service,
    niche,
    duration,
    unitOption,
    dateCompleted,
    cost,
    currencyOption,
    specifications,
    process,
    outcome,
  } = req.body;
  const pid = req.params.pid;
  try {
    const editedProject = await pool.query(
      `UPDATE projects SET
        clientObjective = $1,
        objectiveOption = $2, 
        service = $3, 
        niche = $4, 
        duration = $5, 
        unitOption = $6, 
        dateCompleted = $7, 
        cost = $8,
        currencyOption = $9, 
        specifications = $10, 
        process = $11, 
        outcome = $12
        WHERE pid = $13 AND uid = $14`,
      [
        clientObjective,
        objectiveOption,
        service,
        niche,
        duration,
        unitOption,
        dateCompleted,
        cost,
        currencyOption,
        specifications,
        process,
        outcome,
        pid,
        req.user,
      ]
    );
    res.status(200);
    res.json({ project: editedProject.rows[0] });
  } catch (err) {
    res.status(500);
    console.log(err);
  }
}

module.exports = { editProject };
