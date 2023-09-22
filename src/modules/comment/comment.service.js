const CommentDto = require("./dto/comment.dto");
const commentSchema = require("./comment.schema");
const CelebrityService = require("../celebrity/celebrity.service");
const CommentPageDto = require("./dto/comment-page.dto");
const CommentSortConstant = require("../../constants/comment-sort.constant");

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
    const { page, pageSize, celebrityId, orderBy, zodiac, enneagram, mbti } =
      pageOptionsDto;

    const skip = (page - 1) * pageSize;

    const filter = celebrityId ? { celebrityId } : {};

    if (zodiac) {
      filter.zodiac = zodiac;
    }

    if (mbti) {
      filter.mbti = mbti;
    }

    if (enneagram) {
      filter.enneagram = enneagram;
    }

    let orderByQuery = {
      createdAt: -1,
    };

    if (orderBy === CommentSortConstant.LIKES_COUNT) {
      orderByQuery = { likesCount: -1 };
    }
    const comments = await commentSchema
      .find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort(orderByQuery);

    return new CommentPageDto(comments, page, pageSize);
  }
}

module.exports = CommentService;
