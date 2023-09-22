class ProfileDto {
  constructor(profileSchema) {
    this.id = profileSchema.id;
    this.name = profileSchema.name;
    this.description = profileSchema.description;
    this.mbti = profileSchema.mbti;
    this.variant = profileSchema.variant;
    this.tritype = profileSchema.tritype;
    this.socionics = profileSchema.socionics;
    this.sloan = profileSchema.sloan;
    this.psyche = profileSchema.psyche;
    this.image =
      profileSchema.image ||
      "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI";
  }
}

module.exports = ProfileDto;
