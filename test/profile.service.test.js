/* eslint-disable no-undef */
const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
const sinon = require("sinon");
const ProfileService = require("../src/modules/profile/profile.service");
const ProfileDto = require("../src/modules/profile/dto/profile.dto");
const profileSchema = require("../src/modules/profile/profile.schema");
const mongooseConnect = require("../database-config");

chai.use(require("sinon-chai")); // This allows us to use Sinon's assertions

describe("ProfileService", () => {
  let profileService;
  let sandbox;

  before(() => {
    mongooseConnect().catch(console.dir);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    profileService = new ProfileService();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("create", () => {
    it("should create a new profile", async () => {
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

      const saveStub = sandbox
        .stub(profileSchema.prototype, "save")
        .resolves(createProfileDto);

      const profile = await profileService.create(createProfileDto);

      expect(profile).to.be.an.instanceOf(ProfileDto);
      expect(saveStub).to.have.been.calledOnce;
    });
  });
});
