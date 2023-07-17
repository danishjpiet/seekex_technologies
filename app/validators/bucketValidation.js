const Joi = require("joi");

const createBucketSchema = Joi.object({
  bucketName: Joi.string().max(50).required(),
  bucketVolume: Joi.number().min(1).required(),
});

module.exports = {
  createBucketSchema,
};
