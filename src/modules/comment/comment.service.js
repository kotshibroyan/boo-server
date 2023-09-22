const CommentDto = require("./dto/comment.dto");
const commentSchema = require("./comment.schema");
const CelebrityService = require("../celebrity/celebrity.service");
const CommentPageDto = require("./dto/comment-page.dto");

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

    if (!comment) {
      return null;
    }

    return new CommentDto(comment);
  }

  async getAll(pageOptionsDto) {
    const { page, pageSize, celebrityId } = pageOptionsDto;
    const skip = (page - 1) * pageSize;

    const query = celebrityId ? { celebrityId } : {};
    const comments = await commentSchema.find(query).skip(skip).limit(pageSize);

    return new CommentPageDto(comments, page, pageSize);
  }
}

module.exports = CommentService;
