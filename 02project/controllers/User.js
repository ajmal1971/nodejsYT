const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");
const { signUser, verifyUser } = require("../services/auth_stateless");

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
};

const handleSignin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.redirect("/login");
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("session_id", sessionId);
  return res.redirect("/");
};

const handleSigninJWT = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.redirect("/login");
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("session_id", sessionId);
  return res.redirect("/");
};

module.exports = { handleSignup, handleSignin };
