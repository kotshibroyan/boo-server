const ProfileDto = require('./dto/profile.dto')
const profileSchema = require('./profile.schema');

class ProfileService {
  async create(createProfileDto) {
    const profile = new profileSchema(createProfileDto);
  
    await profile.save();

    return new ProfileDto(profile)
  };

  async getOne(id) {
    const profile = await profileSchema.findOne({ id }).exec();

    return new ProfileDto(profile)
  };
}

module.exports =  ProfileService;