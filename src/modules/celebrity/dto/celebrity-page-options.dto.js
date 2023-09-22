class CelebrityPageOptionsDto {
  constructor(query) {
    this.page = parseInt(query.page) || 1;
    this.pageSize = parseInt(query.pageSize) || 10;
  }
}

module.exports = CelebrityPageOptionsDto;
