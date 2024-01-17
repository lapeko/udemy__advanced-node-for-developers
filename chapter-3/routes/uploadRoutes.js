const { Router } = require("express");
const AWS = require("aws-sdk");
const {v4: uuid} = require("uuid");
const cors = require("cors");

const corsOptions = {
  origin: function (origin, callback) {
    console.log({origin});
    if (origin && origin.endsWith('.amazonaws.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

const requireLogin = require('../middlewares/requireLogin');

const uploadRouter = Router();

uploadRouter.use(requireLogin, cors(corsOptions));

uploadRouter.get("/", (req, res) => {
  const url = s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${req.user._id}/${uuid()}`,
    Expires: 60,
  });
  res.send(url);
});

module.exports = uploadRouter;
