const express = require("express");
const { handleSignup, handleSignin } = require("../controllers/User");

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleSignin);

module.exports = router;
