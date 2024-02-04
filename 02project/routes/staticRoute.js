const express = require("express");
const URL = require("../models/Url");

const router = express.Router();

router.get("/", async (req, res) => {
  const urls = await URL.find({});
  return res.render("home", {
    urls: urls,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
