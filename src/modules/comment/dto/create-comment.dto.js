class CreateCommentDto {
  constructor(body) {
    this.title = body.title;
    this.text = body.text;
    this.description = body.description;
    this.mbti = body.mbti;
    this.enneagram = body.enneagram;
    this.zodiac = body.zodiac;
    this.celebrityId = body.celebrityId;
  }
}

module.exports = CreateCommentDto;
