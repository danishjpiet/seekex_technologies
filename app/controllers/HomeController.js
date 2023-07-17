const Ball = require("../models/Ball");
const Bucket = require("../models/Bucket");
const BallsInBucket = require("../models/BallsInBucket");
const Result = require("../models/Result");
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/db");

const homepage = async (req, res) => {
  const buckets = await Bucket.findAll({
    raw: true,
  });

  const balls = await sequelize.query(
    `SELECT balls.ballName, balls.ballVolume, balls_in_buckets.ballCount FROM balls LEFT OUTER JOIN balls_in_buckets ON balls.ballName = balls_in_buckets.ballName`,
    { type: QueryTypes.SELECT }
  );

  const result = await Result.findOne({
    raw: true,
  });
  let resultDataArray = [];

  const resultArray = result?.resultData
    ? Object.values(JSON.parse(result.resultData))
    : [];

  resultArray.forEach((data) => {
    let key = "";
    let value = "";
    data.forEach((obj) => {
      key = obj.key;
      value = value + obj.value + "and ";
    });
    resultDataArray.push({
      key: key,
      value: "Place " + value.substring(0, value.lastIndexOf("and")) + ".",
    });
  });

  return res.render("index", { buckets, balls, resultDataArray });
};

module.exports = { homepage };
