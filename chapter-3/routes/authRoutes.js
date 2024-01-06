const passport = require("passport");
const express = require("express");

const authRouter = express.Router();

authRouter.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
authRouter.get("/google/callback", passport.authenticate("google"), (req, res) => res.redirect("/blogs"));
authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
})
authRouter.get("/current_user", (req, res) => res.send(req.user));

module.exports = authRouter;
