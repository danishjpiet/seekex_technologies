const Ball = require("../models/Ball");
const Bucket = require("../models/Bucket");
const { removeEmptyElement, clearDataFromDB } = require("../utils");
const BallsInBucket = require("../models/BallsInBucket");
const Result = require("../models/Result");
const _ = require("lodash");
const { placeBallsInBucketSchema } = require("../validators/resultValidation");

const placeBallsInBucket = async (req, res) => {
  const obj = req.body;
  const newObj = removeEmptyElement(obj);

  const arrayOfObjects = Object.values(req.body).map((element) => {
    return {
      value: element,
    };
  });

  const { error, value } = placeBallsInBucketSchema.validate(arrayOfObjects);
  if (error || !Object.keys(req.body).length) {
    req.flash("error", error?.details[0].message);
    return res.redirect("/");
  }

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
      let possibleBallCount = Math.floor(bucketVolume / balls[j].ballVolume);
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
  const ballsInBucketcreated = await BallsInBucket.bulkCreate(data);
  const resultCreated = await Result.create({ resultData: resultData });
  if (ballsInBucketcreated && resultCreated) {
    req.flash("success", "Data successfully stored in database");
  } else {
    req.flash("error", "Something went wrong");
  }
  return res.redirect("/");
};

module.exports = { placeBallsInBucket };
