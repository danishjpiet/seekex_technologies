const { INTEGER } = require("sequelize");
const Ball = require("../models/Ball");
const Bucket = require("../models/Bucket");
const { removeEmptyElement, clearDataFromDB } = require("../utils");
const BallsInBucket = require("../models/BallsInBucket");
const Result = require("../models/Result");
const _ = require("lodash");

const homepage = async (req, res) => {
  const buckets = await Bucket.findAll({
    raw: true,
  });

  const balls = await Ball.findAll({
    attributes: ["ballName", "ballVolume"],
    include: [
      {
        model: BallsInBucket,
        attributes: ["ballCount"],
      },
    ],
    raw: true,
  });

  // console.log(balls);
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

const placeBallsInBucket = async (req, res) => {
  const obj = req.body;
  const newObj = removeEmptyElement(obj);
  const requestData = Object.assign({}, newObj);

  const buckets = await Bucket.findAll({
    order: [["bucketVolume", "DESC"]],
    raw: true,
  });

  const keys = Object.keys(newObj);
  const balls = await Ball.findAll({
    where: {
      ballName: [keys],
    },
    order: [["ballVolume", "ASC"]],
    raw: true,
  });
  let result = [];
  for (let i = 0; i < buckets.length; i++) {
    let bucketName = buckets[i].bucketName;
    let bucketVolume = buckets[i].bucketVolume;
    remainingBallData = {};
    for (let j = 0; j < balls.length; j++) {
      let possibleBallCount = Math.round(bucketVolume / balls[j].ballVolume);
      let remainsBall = 0;

      if (possibleBallCount <= newObj[balls[j].ballName]) {
        remainsBall = newObj[balls[j].ballName] - possibleBallCount;
        bucketVolume = bucketVolume - possibleBallCount * balls[j].ballVolume;
      } else {
        bucketVolume =
          bucketVolume - newObj[balls[j].ballName] * balls[j].ballVolume;
      }

      result.push({
        key: bucketName,
        value: `${newObj[balls[j].ballName] - remainsBall} ${
          balls[j].ballName
        } Balls `,
      });

      if (!remainsBall) {
        balls.splice(j, 1);
        j--;
      } else {
        newObj[balls[j].ballName] = remainsBall;
      }

      if (!bucketVolume) {
        break;
      }
    }
  }

  const grouped = _.groupBy(result, "key");
  const resultData = JSON.stringify(grouped);
  const data = Object.entries(requestData).map((entry) => {
    return {
      ballName: entry[0],
      ballCount: entry[1],
    };
  });

  await clearDataFromDB();
  await BallsInBucket.bulkCreate(data);
  await Result.create({ resultData: resultData });
  return res.redirect("/");
};

module.exports = { homepage, placeBallsInBucket };
