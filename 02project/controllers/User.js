const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

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

  const hashId = uuidv4();
  return res.redirect("/");
};

module.exports = { handleSignup, handleSignin };
