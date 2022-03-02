const express = require("express");
const { WebhookSubscription } = require("../subscription/webhook");
const router = require("express").Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  WebhookSubscription
);

module.exports = router;
