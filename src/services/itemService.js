const BaseRepository = require("../repository/baseRepository");

class ItemService {
  constructor(itemDatabase) {
    this.baseRepository = new BaseRepository({ file: itemDatabase });
  }

  async addItem(item) {
    const alreadyExists = await this.baseRepository.getByName(item.name);

    if (alreadyExists) {
      return { error: new Error("Name already exists") };
    }

    if (!item.qtd || item.qtd < 0) {
      return { error: new Error("Quantity must be greater than 0") };
    }

    const price = item.price && parseFloat(item.price).toFixed(2);

    if (!price || price <= 0.0) {
      return { error: new Error("Price must be greater than 0") };
    }

    return await this.baseRepository.add(item);
  }

  async removeItem(id) {
    const indexOfItem = await this.baseRepository.getById(id);
    return await this.baseRepository.remove(indexOfItem);
  }
}

module.exports = ItemService;
