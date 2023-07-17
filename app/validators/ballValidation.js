const Joi = require("joi");

const linkWithoutLoginSchema = Joi.object({
  url: Joi.string()
    .max(5000)
    .regex(
      /((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))/i
    )
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.pattern.base":
            err.message = "Url is Invalid";
            break;
          default:
            err.message = `Url is too big`;
            break;
        }
      });
      return errors;
    }),
});

const linkSchema = Joi.object({
  url: Joi.string()
    .max(5000)
    .regex(
      /((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))/i
    )
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.pattern.base":
            err.message = "Url is Invalid";
            break;
          default:
            err.message = `Url is too big`;
            break;
        }
      });
      return errors;
    }),
  domain: Joi.string().valid("oia.bio/", "openinapp.co/", "inopenapp.com/"),
});

const analyticsSchema = Joi.object({
  user_id: Joi.number().integer().min(1).required(),
  since: Joi.string().max(2000).required(),
});

const linkAnalyticsSchema = Joi.object({
  user_id: Joi.number().integer().min(1).required(),
  url_id: Joi.number().integer().min(1).required(),
  since: Joi.string(),
});

const updateUrlSchema = Joi.object({
  user_id: Joi.string(),
  url_id: Joi.number().integer().min(1).required(),
  url_suffix: Joi.string()
    .max(100)
    .regex(/^([^/][a-zA-Z0-9-_]*)(([/]{1})?([a-zA-Z0-9-_]*))$/)
    .required(),
  url_prefix: Joi.string()
    .max(100)
    .regex(/^$|^[a-zA-Z0-9_-]+$/)
    .allow(null)
    .allow("")
    .required(),
  title: Joi.any(),
  domain_id: Joi.number().integer().min(1).required(),
});

const updateFbPixelSchema = Joi.object({
  url_id: Joi.number().integer().min(1).required(),
  fb_pixel_id: Joi.string().allow(null).required(),
});

const deleteUrlSchema = Joi.object({
  url_id: Joi.number().integer().min(1).required(),
});

const checkUrlAvailableSchema = Joi.object({
  url_id: Joi.number().integer().min(1).required(),
  url_suffix: Joi.string().max(2000).required(),
  domain: Joi.string().max(2000).required(),
});

const createBallSchema = Joi.object({
  ballName: Joi.string().max(50).required(),
  ballVolume: Joi.number().min(0.1).required(),
});

module.exports = {
  createBallSchema,
};
