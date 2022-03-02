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
      `SELECT pid, clientObjective, objectiveOption, service, niche, duration, unitOption, TO_CHAR(projects.dateCompleted, 'Month d, yyyy'), cost, currencyOption, specifications, process, outcome, filenames FROM PROJECTS WHERE uid = $1 ORDER BY dateCompleted DESC`,
      [uid]
    );
    res.json({ projects: projects.rows });
    res.status(200);
  } catch {
    res.status(500).send("No projects");
  }
}

async function getUserProfile(req, res) {
  const uid = req.params.uid;
  try {
    const user = await pool.query(
      `SELECT uid, displayName, type FROM users WHERE uid = $1`,
      [uid]
    );
    res.json({ user: user.rows });
    res.status(200);
  } catch {
    res.status(500).send("No projects");
  }
}

async function getUserProject(req, res) {
  const uid = req.params.uid;
  const pid = req.params.pid;
  try {
    const project = await pool.query(
      `SELECT users.uid, users.displayName, projects.pid, projects.clientObjective, projects.objectiveOption, projects.service, projects.niche,  projects.duration, projects.unitOption, TO_CHAR(projects.dateCompleted, 'Month dd yyyy'), projects.cost, projects.currencyOption, projects.specifications, projects.process, projects.outcome FROM users LEFT JOIN projects ON users.uid = projects.uid WHERE users.uid = $1 AND projects.pid = $2`,
      [uid, pid]
    );
    res.json({ project: project.rows });
    res.status(200);
  } catch (error) {
    res.status(500).send({ error: "Project doesn't exist" });
  }
}

module.exports = { getUserProjects, getUserProfile, getUserProject };
