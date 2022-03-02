const router = require("express").Router();
const express = require("express");
const app = express();
const { SignUp } = require("../controllers/auth/signup");
const { Login } = require("../controllers/auth/login");
const { Logout } = require("../controllers/auth/logout");
const { getUser } = require("../controllers/auth/user");
const { Auth } = require("../middleware/auth");
const { Token } = require("../controllers/auth/token");

router.post("/signup", SignUp);

router.post("/login", Login);

router.post("/logout", Logout);

router.post("/token", Auth, Token);

router.get("/get-user", Auth, getUser);

app.use(express.json());

module.exports = router;
