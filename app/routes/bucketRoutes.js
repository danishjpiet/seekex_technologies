const bucketRouter = require('express').Router();
const _BucketController = require('../controllers/BucketController');

bucketRouter.post('/createBucket', _BucketController.createBucket);

module.exports = bucketRouter;