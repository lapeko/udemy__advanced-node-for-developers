const mongoose = require("mongoose");

module.exports = async () => {
  mongoose.Promise = global.Promise;
  return mongoose.disconnect();
};