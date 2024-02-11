const { getUser } = require("../services/auth");
const { verifyUser } = require("../services/auth_stateless");

const checkForAuth = async (req, res, next) => {
  const cookieToken = req.cookies?.token;
  req.user = null;

  if (!cookieToken) return next();

  const user = verifyUser(cookieToken);
  req.user = user;
  next();
};

const restrictToRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized!");

    return next();
  };
};

// const validateUserAuthentication = async (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) return res.redirect("/login");

//   //For Statefull Authentication
//   // const user = getUser(sessionId);

//   const user = verifyUser(token);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// };

// const checkAuth = async (req, res, next) => {
//   const token = req.cookies.token;

//   //For Statefull Authentication
//   // const user = getUser(sessionId);

//   const user = verifyUser(token);

//   req.user = user;
//   next();
// };

module.exports = {
  checkForAuth,
  restrictToRole,
};
