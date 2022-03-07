const pool = require("../../database");

/*
async function getUserProjects(req, res) {
  const uid = req.params.uid;
  try {
    const projects = await pool.query(
      `SELECT users.uid, users.fullname, projects.pid, projects.clientObjective, projects.service, projects.duration, projects.unitOption, TO_CHAR(projects.dateCompleted, 'Month dd yyyy') FROM users LEFT JOIN projects ON users.uid = projects.uid WHERE users.uid = $1 ORDER BY projects.dateCompleted DESC`,
      [uid]
    );
    res.json({ projects: projects.rows });
    res.status(200);
  } catch {
    res.status(500).send("No projects");
  }
}*/

async function getUserProjects(req, res) {
  const uid = req.params.uid;
  try {
    const projects = await pool.query(
      `SELECT pid, clientObjective, service, keyInfo, description, status, duration, durationUnit, costAmount, costCurrency, TO_CHAR(projects.dateCompleted, 'Month d, yyyy'), clientName, clientIndustry, clientNiche, clientWords, filenames FROM PROJECTS WHERE uid = $1 ORDER BY dateCompleted DESC NULLS FIRST`,
      [uid]
    );
    res.json({ projects: projects.rows });
    res.status(200);
  } catch (error) {
    console.log(error);

    res.status(500);
  }
}
/*
async function getUserProjects(req, res) {
  const uid = req.params.uid;
  try {
    const projects = await pool.query(
      `SELECT pid, clientObjective, objectiveOption, service, niche, duration, unitOption, TO_CHAR(projects.dateCompleted, 'Month d, yyyy'), cost, currencyOption, specifications, process, outcome, filenames FROM PROJECTS WHERE uid = $1 ORDER BY dateCompleted DESC`,
      [uid]
    );
    res.json({ projects: projects.rows });
    res.status(200);
  } catch {
    res.status(500).send("No projects");
  }
}*/

async function getUserProfile(req, res) {
  const uid = req.params.uid;
  try {
    const user = await pool.query(
      `SELECT uid, displayName, type FROM users WHERE uid = $1`,
      [uid]
    );
    res.json({ user: user.rows });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

async function getUserProject(req, res) {
  const uid = req.params.uid;
  const pid = req.params.pid;
  try {
    const project = await pool.query(
      `SELECT * FROM PROJECTS WHERE uid = $1 AND pid = $2`,
      [uid, pid]
    );
    res.json({ project: project.rows });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

module.exports = { getUserProjects, getUserProfile, getUserProject };
