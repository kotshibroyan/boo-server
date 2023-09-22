const Joi = require("joi");

const createBody = Joi.object({
  name: Joi.string().min(1).required(),
  content: Joi.string().optional(),
});

function validateCreateBody(req, res, next) {
  const { error } = createBody.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

module.exports = { validateCreateBody };
