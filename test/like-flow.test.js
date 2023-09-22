/* eslint-disable no-undef */
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
const CelebrityService = require("../src/modules/celebrity/celebrity.service");
const CelebrityDto = require("../src/modules/celebrity/dto/celebrity.dto");
const mongooseConnect = require("../database-config");
const ProfileService = require("../src/modules/profile/profile.service");
const ProfileDto = require("../src/modules/profile/dto/profile.dto");
const MbtiConstant = require("../src/constants/mbti.constant");
const EnneagramConstant = require("../src/constants/enneagram.constant");
const ZodiacConstant = require("../src/constants/zodiac.constant");
const CommentService = require("../src/modules/comment/comment.service");
const CommentDto = require("../src/modules/comment/dto/comment.dto");
const ToggleLikeDto = require("../src/modules/comment/dto/toggle-like.dto");

chai.use(require("sinon-chai"));

describe("CommentService", () => {
  let celebrityService;

  before(async () => {
    mongooseConnect().catch(console.dir);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    celebrityService = new CelebrityService();
    profileService = new ProfileService();
    commentService = new CommentService();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {});

  describe("create", () => {
    it("should create a new celebrity, a new user profile, then with that user should create a comment, after set like to that comment", async () => {
      const createCelebrityDto = {
        name: "Celebrity Name",
        content: "Content for Celebrity",
      };

      const celebrity = await celebrityService.create(createCelebrityDto);
      console.log();
      const createProfileDto = {
        name: "User Name",
        description: "description",
        mbti: "INFP",
        variant: "variant",
        tritype: 123,
        socionics: "socionics",
        sloan: "sloan",
        psyche: "psyche",
        image:
          "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
        enneagram: "1w2",
      };

      const profile = await profileService.create(createProfileDto);

      const user = await profileService.getUserDocument(profile.id);
      const createCommentDto = {
        title: "title",
        text: "text",
        description: "description",
        mbti: MbtiConstant.ENFJ,
        enneagram: EnneagramConstant.E1w2,
        zodiac: ZodiacConstant.AQUARIUS,
        celebrityId: celebrity.id,
      };
      const createdComment = await commentService.create(
        user,
        createCommentDto,
      );

      const retrievedComment = await commentService.getOne(createdComment.id);

      const toggleLikeDto = await commentService.toggleLike(
        user,
        retrievedComment.id,
      );

      expect(toggleLikeDto).to.be.an.instanceOf(ToggleLikeDto);
      expect(toggleLikeDto.isLiked).to.be.true;
      expect(profile).to.be.an.instanceOf(ProfileDto);
      expect(celebrity).to.be.an.instanceOf(CelebrityDto);
      expect(retrievedComment).to.be.an.instanceOf(CommentDto);
    });
  });
});
