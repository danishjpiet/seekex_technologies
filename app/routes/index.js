const router = require('express').Router();

router.use('/', require('./bucketRoutes'));
router.use('/', require('./ballRoutes'));
router.use('/', require('./homeRoutes'));

module.exports = router;