const { verifyAndGetUser } = require("../services/auth");

const checkAuthCookie = (cookieName) => {
  return (req, res, next) => {
    const cookieTokenValue = req.cookies[cookieName];
    if (!cookieTokenValue) return next();

    try {
      const user = verifyAndGetUser(cookieTokenValue);
      req.user = user;
    } catch (error) {}

    return next();
  };
};

module.exports = {
  checkAuthCookie,
};
