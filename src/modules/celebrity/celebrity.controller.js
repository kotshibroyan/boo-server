const celebrityService = require("./celebrity.service");

const { create, getOne, getAll } = new celebrityService();

class celebrityController {
  async create(createCelebrityDto) {
    return create(createCelebrityDto);
  }

  async getOne(id) {
    return getOne(id);
  }

  async getAll(pageOptionsDto) {
    return getAll(pageOptionsDto);
  }
}

module.exports = celebrityController;
