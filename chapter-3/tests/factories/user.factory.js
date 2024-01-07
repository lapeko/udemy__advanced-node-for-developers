const User = require('../../models/User');

const users = [];
module.exports.getNewTestUser = async () => {
  const user = new User({});
  users.push(user);
  return await user.save();
};

module.exports.destroyAllTestUsers = async () => {
  for (let user of users) await user.deleteOne();
}
