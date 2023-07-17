const resultRouter = require("express").Router();
const _ResultController = require("../controllers/ResultController");

resultRouter.post("/placeBallsInBucket", _ResultController.placeBallsInBucket);

module.exports = resultRouter;
