const homeRouter = require("express").Router();
const _HomeController = require("../controllers/HomeController");

homeRouter.get("/", _HomeController.homepage);
homeRouter.get("/clearAllData", _HomeController.clearAllData);

module.exports = homeRouter;
