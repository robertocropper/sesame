const pool = require("../../database");

async function editProject(req, res) {
  var {
    clientObjective,
    service,
    keyInfo,
    description,
    status,
    duration,
    durationUnit,
    costAmount,
    costCurrency,
    dateCompleted,
    clientName,
    clientIndustry,
    clientNiche,
    clientWords,
  } = req.body;
  if (dateCompleted === "" || "undefined") {
    var dateCompleted = null;
  }
  const pid = req.params.pid;
  const filenames = req.files.map(({ filename }) => filename);
  try {
    const editedProject = await pool.query(
      `UPDATE PROJECTS SET
        clientObjective = $1,
        service = $2, 
        keyInfo = $3,
        description = $4, 
        status = $5, 
        duration = $6, 
        durationUnit = $7, 
        costAmount = $8, 
        costCurrency = $9, 
        dateCompleted = $10, 
        clientName = $11,
        clientIndustry = $12, 
        clientNiche = $13, 
        clientWords = $14,
        filenames = $15
        WHERE pid = $16 AND uid = $17`,
      [
        clientObjective,
        service,
        keyInfo,
        description,
        status,
        duration,
        durationUnit,
        costAmount,
        costCurrency,
        dateCompleted,
        clientName,
        clientIndustry,
        clientNiche,
        clientWords,
        filenames,
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
