const { Router } = require("express");
const { S3Client } = require("@aws-sdk/client-s3");

const requireLogin = require('../middlewares/requireLogin');

const uploadRouter = Router();

uploadRouter.use(requireLogin);

const s3 = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secret: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

uploadRouter.post("/", (req, res) => {
  const user = res.locals.user;
  console.log({user});

});

module.exports = uploadRouter;
