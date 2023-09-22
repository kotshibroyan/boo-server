const Joi = require("joi");
const ZodiacConstant = require("../constants/zodiac.constant");
const EnneagramConstant = require("../constants/enneagram.constant");
const MbtiConstant = require("../constants/mbti.constant");
const ProfileService = require("../modules/profile/profile.service");

const profileService = new ProfileService();

const createBody = Joi.object({
  title: Joi.string().min(1).required(),
  text: Joi.string().optional(),
  celebrityId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  mbti: Joi.string()
    .valid(...Object.values(MbtiConstant))
    .optional(),
  enneagram: Joi.string()
    .valid(...Object.values(EnneagramConstant))
    .optional(),
  zodiac: Joi.string()
    .valid(...Object.values(ZodiacConstant))
    .optional(),
});

function validateCreateBody(req, res, next) {
  const { error } = createBody.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

async function validateUserId(req, res, next) {
  const userId = req.headers["x-user-id"];

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const schema = Joi.string().guid({ version: ["uuidv4"] });
  const { error } = schema.validate(userId);

  if (error) {
    return res.status(400).json({ error: "error.invalidUuid" });
  }

  const user = await profileService.getObjectIdWithId(req.headers["x-user-id"]);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = user;

  next();
}

async function validatePageOptions(req, res, next) {
  const schema = Joi.string()
    .guid({ version: ["uuidv4"] })
    .optional();
  const { error } = schema.validate(req.query.celebrityId);

  if (error) {
    return res.status(400).json({ error: "error.invalidUuid" });
  }

  next();
}

module.exports = { validateCreateBody, validateUserId, validatePageOptions };
