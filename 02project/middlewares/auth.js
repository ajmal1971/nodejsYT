const { getUser } = require("../services/auth");

const validateUserAuthentication = async (req, res, next) => {
  const sessionId = req.cookies.session_id;

  if (!sessionId) return res.redirect("/login");

  const user = getUser(sessionId);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
};

module.exports = {
  validateUserAuthentication,
};
