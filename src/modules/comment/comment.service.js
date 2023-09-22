const CommentDto = require("./dto/comment.dto");
const commentSchema = require("./comment.schema");
const CelebrityService = require("../celebrity/celebrity.service");

const celebrityService = new CelebrityService();

class CommentService {
  async create(user, createCommentDto) {
    const celebrity = await celebrityService.getObjectIdWithId(
      createCommentDto.celebrityId,
    );
    if (!celebrity) {
      return;
    }
    const comment = new commentSchema({
      ...createCommentDto,
      user,
      celebrity,
    });

    await comment.save();

    return new CommentDto(comment);
  }

  async getOne(id) {
    const comment = await commentSchema.findOne({ id }).exec();

    return new CommentDto(comment);
  }
}

module.exports = CommentService;
