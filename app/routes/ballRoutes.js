const ballRouter = require('express').Router();
const _BallController = require('../controllers/BallController');

ballRouter.post('/createBall', _BallController.createBall);

module.exports = ballRouter;