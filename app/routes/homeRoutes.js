const homeRouter = require("express").Router();
const _HomeController = require("../controllers/HomeController");

homeRouter.get("/", _HomeController.homepage);

module.exports = homeRouter;
