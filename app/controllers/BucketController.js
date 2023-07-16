const Bucket = require("../models/Bucket");
const { clearDataFromDB } = require("../utils");

const createBucket = async (req, res) => {
  const { bucket_name, bucket_volume } = req.body;
  const data = {
    bucketName: bucket_name,
    bucketVolume: bucket_volume,
  };
  await Bucket.create(data);
  await clearDataFromDB();
  return res.redirect("/");
};

module.exports = { createBucket };
