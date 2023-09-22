const Joi = require("joi");

const validateUuid = (paramName) => {
  return (req, res, next) => {
    const schema = Joi.string().guid({ version: ["uuidv4"] });
    const { error } = schema.validate(req.params[paramName]);

    if (error) {
      return res.status(400).json({ error: "error.invalidUuid" });
    }

    next();
  };
};

module.exports = validateUuid;
