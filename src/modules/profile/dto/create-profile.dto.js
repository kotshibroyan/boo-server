class CreateProfileDto {
  constructor(body) {
    this.name = body.name;
    this.description = body.description;
    this.mbti = body.mbti;
    this.variant = body.variant;
    this.tritype = body.tritype;
    this.socionics = body.socionics;
    this.sloan = body.sloan;
    this.psyche = body.psyche;
    this.image = body.image;
    this.enneagram = body.enneagram;
  }
}

module.exports = CreateProfileDto;
