const Joi = require("joi");

const placeBallsInBucketSchema = Joi.array().items(
  Joi.object({
    value: Joi.number().min(1).required(),
  })
);

module.exports = {
  placeBallsInBucketSchema,
};
