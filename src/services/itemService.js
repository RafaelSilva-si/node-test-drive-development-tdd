const BaseRepository = require("../repository/baseRepository");

class ItemService {
  constructor(itemDatabase) {
    this.baseRepository = new BaseRepository({ file: itemDatabase });
  }

  async addItem(item) {
    return await this.baseRepository.add(item);
  }
}

module.exports = ItemService;
