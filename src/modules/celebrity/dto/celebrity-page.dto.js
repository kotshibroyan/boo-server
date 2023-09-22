const PageMetaDto = require("../../../dto/page-meta.dto");
const CelebrityDto = require("./celebrity.dto");

class CelebrityPageDto {
  constructor(celebritySchemas, page, pageSize) {
    this.data = [];
    for (const celebritySchema of celebritySchemas) {
      this.data.push(new CelebrityDto(celebritySchema));
    }

    this.meta = new PageMetaDto(page, pageSize);
  }
}

module.exports = CelebrityPageDto;
