const User = require("../models/User");

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.render("home");
};

module.exports = { handleSignup };
