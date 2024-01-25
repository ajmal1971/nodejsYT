const fs = require("fs");

const logRequest = (req, res, next) => {
  const dateStr = new Date().toLocaleDateString();
  fs.appendFile(
    "./log.txt",
    `Date - ${dateStr} | IP - ${req.ip} | Method - ${req.method} | Route - ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
};

module.exports = logRequest;
