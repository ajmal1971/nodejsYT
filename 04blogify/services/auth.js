const JWT = require("jsonwebtoken");
const SECRET = "$I$Love$Allah$(AMS)";

const createToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };

  const token = JWT.sign(payload, SECRET);
  return token;
};

const verifyAndGetUser = (token) => {
  const user = JWT.verify(token, SECRET);
  return user;
};

module.exports = {
  createToken,
  verifyAndGetUser,
};
