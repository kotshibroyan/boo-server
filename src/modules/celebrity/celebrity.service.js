const CelebrityDto = require("./dto/celebrity.dto");
const celebritySchema = require("./celebrity.schema");
const CelebrityPageDto = require("./dto/celebrity-page.dto");

class CelebrityService {
  async create(createCelebrityDto) {
    const celebrity = new celebritySchema(createCelebrityDto);

    await celebrity.save();

    return new CelebrityDto(celebrity);
  }

  async getOne(id) {
    const celebrity = await celebritySchema.findOne({ id }).exec();

    if (!celebrity) {
      return null;
    }
    return new CelebrityDto(celebrity);
  }

  async getAll(pageOptionsDto) {
    const { page, pageSize } = pageOptionsDto;
    const skip = (page - 1) * pageSize;
    const celebrities = await celebritySchema
      .find({})
      .skip(skip)
      .limit(pageSize);

    return new CelebrityPageDto(celebrities, page, pageSize);
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
