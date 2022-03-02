const pool = require("../database");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

async function Portal(req, res) {
  const customer = await pool.query(`SELECT * FROM users WHERE uid = $1`, [
    req.user,
  ]);
  const returnUrl = process.env.APP_URL;
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customer.rows[0].stripeid,
    return_url: returnUrl,
  });

  res.redirect(portalSession.url);
}

module.exports = { Portal };
