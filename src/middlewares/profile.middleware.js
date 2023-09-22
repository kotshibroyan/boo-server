const Joi = require("joi");

const createBody = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().optional(),
  mbti: Joi.string().optional(),
  enneagram: Joi.string().optional(),
  variant: Joi.string().optional(),
  tritype: Joi.number().optional(),
  socionics: Joi.string().optional(),
  sloan: Joi.string().optional(),
  psyche: Joi.string().optional(),
  image: Joi.string().uri().optional(),
});

function validateCreateBody(req, res, next) {
  const { error } = createBody.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

module.exports = { validateCreateBody };
