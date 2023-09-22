class CommentPageOptionsDto {
  constructor(query) {
    this.page = parseInt(query.page) || 1;
    this.pageSize = parseInt(query.pageSize) || 10;
    this.celebrityId = query.celebrityId;
  }
}

module.exports = CommentPageOptionsDto;
