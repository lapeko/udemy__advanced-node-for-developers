const Keygrip = require("keygrip");
const cookieKey = require("../../config/dev").cookieKey;

module.exports = (user) => {
  const sessionObject = {passport: {user: user._id.toString()}};
  const session = btoa(JSON.stringify(sessionObject));
  const keygrip = new Keygrip([cookieKey]);
  const sig = keygrip.sign("session=" + session);
  return {session, sig};
};
