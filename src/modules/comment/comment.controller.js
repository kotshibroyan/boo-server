const CommentService = require("./comment.service");

const { create, getOne, getAll } = new CommentService();

class CommentController {
  async create(user, createCommentDto) {
    return create(user, createCommentDto);
  }

  async getOne(id) {
    return getOne(id);
  }

  async getAll(pageOptionsDto) {
    return getAll(pageOptionsDto);
  }
}

module.exports = CommentController;
