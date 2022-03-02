const express = require("express");
const app = express();
const router = require("express").Router();
const { editUser } = require("../controllers/user/put");
const { Auth } = require("../middleware/auth");

router.put("/:uid/edit", Auth, editUser);

app.use(express.json());

module.exports = router;
