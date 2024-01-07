const User = require('../../models/User');

const users = [];

module.exports.getNewTestUser = () => {
  const user = new User({});
  users.push(user);
  return user.save();
};

module.exports.destroyAllTestUsers = () => {
  users.forEach(user => user.remove());
}
