const express = require("express");
const {
  handleSignup,
  handleSignin,
  handleSigninJWT,
} = require("../controllers/User");

const router = express.Router();

router.post("/signup", handleSignup);
// router.post("/login", handleSignin);
router.post("/login", handleSigninJWT);

module.exports = router;
