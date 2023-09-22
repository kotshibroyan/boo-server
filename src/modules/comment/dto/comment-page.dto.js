const PageMetaDto = require("../../../dto/page-meta.dto");
const CommentDto = require("./comment.dto");

class CommentPageDto {
  constructor(commentSchemas, page, pageSize) {
    this.data = [];
    for (const commentSchema of commentSchemas) {
      this.data.push(new CommentDto(commentSchema));
    }

    this.meta = new PageMetaDto(page, pageSize);
  }
}

module.exports = CommentPageDto;
