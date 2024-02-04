const sessionIdToUserMap = new Map();

const setUser = (sessionId, user) => {
  sessionIdToUserMap.set(sessionId, user);
};

const getUser = (sessionId) => {
  sessionIdToUserMap.get(sessionId);
};

module.exports = {
  setUser,
  getUser,
};
