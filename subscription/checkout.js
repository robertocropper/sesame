require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

async function CreateSubscription(req, res) {
  const prices = await stripe.prices.list({
    product: process.env.PROFESSIONAL_PLAN,
    lookup_keys: [req.body.lookup_key],
    expand: ["data.product"],
  });
  console.log(prices.data);
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    client_reference_id: req.user,
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: "subscription",
    metadata: { uid: req.user },
    success_url: `${process.env.APP_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}?canceled=true`,
  });

  res.redirect(303, session.url);
}

module.exports = { CreateSubscription };
