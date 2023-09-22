class CelebrityDto {
  constructor(celebritySchema) {
    this.id = celebritySchema.id;
    this.name = celebritySchema.name;
    this.content = celebritySchema.content;
  }
}

module.exports = CelebrityDto;
