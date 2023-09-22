const ProfileService = require('./profile.service')

const { create, getOne } = new ProfileService();

class ProfileController {
    async create(createProfileDto) {
        return create(createProfileDto);
    }

    async getOne(id) {
        return getOne(id);
    }
}

module.exports = ProfileController;