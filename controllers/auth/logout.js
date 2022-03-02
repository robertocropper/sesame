require("dotenv").config();

async function Logout(req, res) {
  try {
    res
      .clearCookie("accessToken", { path: "/", domain: process.env.APP_DOMAIN })
      .send();
    return res.status(200);
  } catch {
    res.status(500).send({ error: "Server error" });
  }
}

module.exports = { Logout };
