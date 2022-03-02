const pool = require("../database");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function WebhookSubscription(req, res) {
  let event = req.body;
  console.log(req.body);
  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (error) {
      console.log(error.message);
      return res.status(400);
    }
  }

  let subscription;
  let status;
  let uid;
  let customer;
  let subscriptionId;
  let plan;

  switch (event.type) {
    case "checkout.session.completed":
      subscription = event.data.object;
      subscriptionId = subscription.subscription;
      uid = subscription.metadata.uid;
      status = subscription.status;
      customer = subscription.customer;
      const updateMeta = await stripe.customers.update(customer, {
        metadata: { uid: uid },
      });
      const insertUser = await pool.query(
        `UPDATE users SET
        stripeId = $1
        WHERE uid = $2`,
        [customer, uid]
      );
      const getSubscriptionId = await stripe.subscriptions.retrieve(
        subscriptionId
      );
      plan = getSubscriptionId.plan.product;
      status = getSubscriptionId.status;
      const insertPlan = await pool.query(
        `UPDATE users SET
        plan = $1, 
        status = $2
        WHERE stripeId = $3`,
        [plan, status, customer]
      );
      break;
    case "invoice.payment_failed":
      subscription = event.data.object;
      status = subscription.status;
      customer = subscription.customer;
      const updateStatus = await pool.query(
        `UPDATE users SET 
        status = $1
        WHERE stripeId = $2`,
        [status, customer]
      );
      console.log(updateStatus);
      break;
    case "customer.subscription.updated":
      subscription = event.data.object;
      //console.log(subscription);
      plan = subscription.plan.product;
      status = subscription.status;
      customer = subscription.customer;
      const updatePlan = await pool.query(
        `UPDATE users SET
        plan = $1, 
        status = $2
        WHERE stripeId = $3`,
        [plan, status, customer]
      );
      //console.log(updatePlan);
      break;
    case "customer.subscription.deleted":
      subscription = event.data.object;
      console.log(subscription);
      plan = subscription.plan.product;
      status = subscription.status;
      customer = subscription.customer;
      const deletePlan = await pool.query(
        `UPDATE users SET
        plan = $1, 
        status = $2
        WHERE stripeId = $3`,
        [plan, status, customer]
      );
      console.log(deletePlan);
      break;
    default:
  }

  res.status(200).end();
}

module.exports = { WebhookSubscription };
