const mongoose = require("mongoose");

const keys = require("../config/keys");
const {destroyAllTestUsers} = require("./factories/user.factory");

mongoose.Promise = global.Promise;

beforeAll(async () => {
  mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await destroyAllTestUsers();
  await mongoose.disconnect();
});