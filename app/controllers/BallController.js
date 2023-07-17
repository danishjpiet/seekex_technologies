const Ball = require("../models/Ball");
const { clearDataFromDB } = require("../utils");
const { createBallSchema } = require("../validators/ballValidation");

const createBall = async (req, res) => {
  const { error, value } = createBallSchema.validate(req.body);
  if (error) {
    req.flash("error", error.details[0].message);
    return res.redirect("/");
  }

  const { ballName, ballVolume } = value;
  const data = {
    ballName,
    ballVolume,
  };

  const created = await Ball.create(data);
  await clearDataFromDB();
  if (created) {
    req.flash("success", "Ball created successfully");
  } else {
    req.flash("error", "Something went wrong.");
  }
  return res.redirect("/");
};

module.exports = { createBall };
