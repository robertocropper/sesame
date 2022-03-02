const pool = require("../../database");

async function createProject(req, res) {
  console.log(req.files);
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
  const filenames = req.files.map(({ filename }) => filename);
  try {
    const createdProject = await pool.query(
      `INSERT INTO PROJECTS 
      (uid, 
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
      filenames,
      category, 
      tags, 
      kpi, 
      published, 
      private) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, null, null, null, True, False) RETURNING *`,
      [
        req.user,
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
        filenames,
      ]
    );
    res.status(200);
    res.json({ project: createdProject.rows[0] });
  } catch (err) {
    res.status(500);
    console.log(err);
  }
}

module.exports = { createProject };
