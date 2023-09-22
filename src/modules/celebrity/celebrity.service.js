const CelebrityDto = require("./dto/celebrity.dto");
const celebritySchema = require("./celebrity.schema");

class CelebrityService {
  async create(createCelebrityDto) {
    const celebrity = new celebritySchema(createCelebrityDto);

    await celebrity.save();

    return new CelebrityDto(celebrity);
  }

  async getOne(id) {
    const comment = await celebritySchema.findOne({ id }).exec();

    return new CelebrityDto(comment);
  }

  async getObjectIdWithId(id) {
    const profile = await celebritySchema.findOne({ id }).exec();

    if (!profile) {
      return null;
    }

    return profile._id;
  }
}

module.exports = CelebrityService;
