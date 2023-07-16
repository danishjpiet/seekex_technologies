const BallsInBucket = require("../models/BallsInBucket");
const Result = require("../models/Result");

const removeEmptyElement = (obj) => {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

const clearDataFromDB = async () => {
  await Result.destroy({
    truncate: true,
  });
  await BallsInBucket.destroy({
    truncate: true,
  });
};

module.exports = { removeEmptyElement, clearDataFromDB };
