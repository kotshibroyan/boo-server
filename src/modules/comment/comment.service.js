const CommentDto = require("./dto/comment.dto");
const commentSchema = require("./comment.schema");
const likeSchema = require("./like.schema");
const CelebrityService = require("../celebrity/celebrity.service");
const CommentPageDto = require("./dto/comment-page.dto");
const CommentSortConstant = require("../../constants/comment-sort.constant");
const ToggleLikeDto = require("./dto/toggle-like.dto");

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
      user: user._id,
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

  async toggleLike(user, commentId) {
    const like = await likeSchema
      .findOne({ userId: user.id, commentId })
      .exec();
    const comment = await commentSchema.findOne({ id: commentId }).exec();

    if (!comment) {
      return null;
    }

    const toggleLikeDto = new ToggleLikeDto(false);

    if (like) {
      comment.likesCount = comment.likesCount - 1;
      await Promise.all([
        likeSchema.deleteOne({ id: like.id }),
        comment.save(),
      ]);

      return toggleLikeDto;
    } else {
      comment.likesCount = comment.likesCount + 1;
    }

    const newLike = new likeSchema({
      user: user._id,
      userId: user.id,
      comment: comment._id,
      commentId,
    });

    await Promise.all([comment.save(), newLike.save()]);

    toggleLikeDto.isLiked = true;

    return toggleLikeDto;
  }
}

module.exports = CommentService;
