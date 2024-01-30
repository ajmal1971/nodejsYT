const mongoose = require('mongoose');

const connectMongoDB = (connectionString) => {
    return mongoose.connect(connectionString);
}

module.exports = connectMongoDB;