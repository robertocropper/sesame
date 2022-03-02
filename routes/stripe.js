const express = require("express");
const { Auth } = require("../middleware/auth");
const { CreateSubscription } = require("../subscription/checkout");
const { Portal } = require("../subscription/portal");
const router = require("express").Router();
const app = express();

app.use(express.json());

router.post("/create-checkout-session", Auth, CreateSubscription);

router.post("/create-portal-session", Auth, Portal);

app.use(express.urlencoded({ extended: true }));

module.exports = router;
