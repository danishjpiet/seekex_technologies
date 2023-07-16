const homeRouter = require("express").Router();
const _HomeController = require("../controllers/HomeController");

homeRouter.get("/", _HomeController.homepage);
homeRouter.post("/placeBallsInBucket", _HomeController.placeBallsInBucket);

module.exports = homeRouter;
