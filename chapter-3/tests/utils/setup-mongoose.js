const mongoose = require("mongoose");

const keys = require("../../config/keys");

module.exports.setupMongoose = async () => {
  mongoose.Promise = global.Promise;

  return mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports.destroyMongoose = async () => {
  mongoose.Promise = global.Promise;
  return mongoose.disconnect();
};
