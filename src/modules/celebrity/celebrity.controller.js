const celebrityService = require("./celebrity.service");

const { create, getOne } = new celebrityService();

class celebrityController {
  async create(createCelebrityDto) {
    return create(createCelebrityDto);
  }

  async getOne(id) {
    return getOne(id);
  }
}

module.exports = celebrityController;
