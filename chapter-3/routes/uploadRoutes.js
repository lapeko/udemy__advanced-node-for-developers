const { Router } = require("express");
const {v4: uuid} = require("uuid");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

const requireLogin = require('../middlewares/requireLogin');

const uploadRouter = Router();

uploadRouter.use(requireLogin);

uploadRouter.route("/")
  .get((req, res) => {
    const key = `${req.user._id}/${uuid()}`;
    const url = s3.getSignedUrl('putObject', {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 60 * 1000,
    });
    res.json({url, key});
  })
  .post((req, res) => {
    const key = req.body.key;

  });

module.exports = uploadRouter;
