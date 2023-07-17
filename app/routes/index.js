const router = require("express").Router();

router.use("/", require("./bucketRoutes"));
router.use("/", require("./ballRoutes"));
router.use("/", require("./homeRoutes"));
router.use("/", require("./resultRoutes"));

module.exports = router;
