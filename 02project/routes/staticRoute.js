const express = require("express");
const URL = require("../models/Url");
const { restrictToRole } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls", restrictToRole(["ADMIN"]), async (req, res) => {
  const urls = await URL.find({});
  return res.render("home", {
    urls: urls,
  });
});

router.get("/", restrictToRole(["NORMAL", "ADMIN"]), async (req, res) => {
  const urls = await URL.find({ createdBy: req.user._id });
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
