class CommentPageOptionsDto {
  constructor(query) {
    this.page = parseInt(query.page) || 1;
    this.pageSize = parseInt(query.pageSize) || 10;
    this.celebrityId = query.celebrityId;
    this.orderBy = query.orderBy;
    this.mbti = query.mbti;
    this.enneagram = query.enneagram;
    this.zodiac = query.zodiac;
  }
}

module.exports = CommentPageOptionsDto;
