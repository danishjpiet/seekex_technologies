const Bucket = require("../models/Bucket");
const { clearDataFromDB } = require("../utils");
const { createBucketSchema } = require("../validators/bucketValidation");

const createBucket = async (req, res) => {
  const { error, value } = createBucketSchema.validate(req.body);
  if (error) {
    req.flash("error", error.details[0].message);
    return res.redirect("/");
  }

  const { bucketName, bucketVolume } = value;
  const data = { bucketName, bucketVolume };
  const created = await Bucket.create(data);

  await clearDataFromDB();

  if (created) {
    req.flash("success", "Bucket created successfully");
  } else {
    req.flash("error", "Something went wrong.");
  }
  return res.redirect("/");
};

module.exports = { createBucket };
