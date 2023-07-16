const Ball = require("../models/Ball");
const Bucket = require("../models/Bucket");
const { clearDataFromDB } = require("../utils");

const createBall = async (req, res) => {
  const { ball_name, ball_volume } = req.body;
  const data = {
    ballName: ball_name,
    ballVolume: ball_volume,
  };
  await Ball.create(data);
  await clearDataFromDB();
  return res.redirect("/");
};

module.exports = { createBall };
