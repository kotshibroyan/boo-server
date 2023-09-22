const CommentService = require("./comment.service");

const { create, getOne } = new CommentService();

class CommentController {
  async create(user, createCommentDto) {
    return create(user, createCommentDto);
  }

  async getOne(id) {
    return getOne(id);
  }
}

module.exports = CommentController;
