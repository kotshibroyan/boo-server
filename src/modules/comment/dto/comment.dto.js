class CommentDto {
  constructor(commentSchema) {
    this.id = commentSchema.id;
    this.title = commentSchema.title;
    this.description = commentSchema.description;
    this.mbti = commentSchema.mbti;
    this.enneagram = commentSchema.enneagram;
    this.zodiac = commentSchema.zodiac;
  }
}

module.exports = CommentDto;
