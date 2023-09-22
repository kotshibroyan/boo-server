const ProfileDto = require("./dto/profile.dto");
const profileSchema = require("./profile.schema");

class ProfileService {
  async create(createProfileDto) {
    const profile = new profileSchema(createProfileDto);

    await profile.save();

    return new ProfileDto(profile);
  }

  async getOne(id) {
    const profile = await profileSchema.findOne({ id }).exec();

    if (!profile) {
      return null;
    }

    return new ProfileDto(profile);
  }

  async getUserDocument(id) {
    const profile = await profileSchema.findOne({ id }).exec();

    if (!profile) {
      return null;
    }

    return profile;
  }
}

module.exports = ProfileService;
