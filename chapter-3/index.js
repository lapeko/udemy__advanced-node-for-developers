const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

dotenv.config();

const passport = require('./services/passport');
const keys = require('./config/keys');
const appRouter = require("./app-router");

const PORT = process.env.PORT || keys.port || 5001;

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey],
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(appRouter);

if (["production", "ci"].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Listening on port`, PORT));
