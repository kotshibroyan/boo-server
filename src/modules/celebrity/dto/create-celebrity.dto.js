class CreateCelebrityDto {
  constructor(body) {
    this.name = body.name;
    this.content = body.content;
  }
}

module.exports = CreateCelebrityDto;
