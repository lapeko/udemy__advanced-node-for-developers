// jest.setTimeout(20000);

const mongoose = require("mongoose");
const { createClient } = require('redis');
const keys = require("../config/keys");
const { destroyAllTestUsers } = require("./factories/user.factory");

mongoose.Promise = global.Promise;
const redisClient = createClient(); // Updated Redis client creation

beforeAll(async () => {
  await redisClient.connect();
  await redisClient.flushAll();
  await mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await destroyAllTestUsers();
  await mongoose.disconnect();
  await redisClient.quit();
});