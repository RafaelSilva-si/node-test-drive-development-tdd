const BaseRepository = require("../repository/baseRepository");

class ItemService {
  constructor(itemDatabase) {
    this.baseRepository = new BaseRepository({ file: itemDatabase });
  }

  async addItem(item) {
    if (!item.qtd || item.qtd < 0) {
      return { error: new Error("Quantity must be greater than 0") };
    }

    const price = item.price && parseFloat(item.price).toFixed(2);

    if (!price || price <= 0.0) {
      return { error: new Error("Price must be greater than 0") };
    }

    return await this.baseRepository.add(item);
  }
}

module.exports = ItemService;
