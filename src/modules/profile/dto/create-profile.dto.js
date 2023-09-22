class CreateProfileDto {
    name;
    description;
    mbti;
    enneagram;
    variant;
    tritype;
    socionics;
    sloan;
    psyche;
    image;

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
    }
 }

 module.exports = CreateProfileDto;