const jwt = require('jsonwebtoken');
const SECRET = 'Ajmal@123456$@23$@';

const signUser = (user) => {
    return jwt.sign({ _id: user._id, email: user.email }, SECRET);
};

const verifyUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    signUser,
    verifyUser,
};
