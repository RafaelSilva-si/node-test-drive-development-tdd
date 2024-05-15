const BaseRepository = require("../repository/baseRepository");

class ItemService {
  constructor(itemDatabase) {
    this.baseRepository = new BaseRepository({ file: itemDatabase });
  }

  async getItems() {
    return await this.baseRepository.getAll();
  }

  async addItem(item) {
    const alreadyExists = await this.baseRepository.getByName(item.name);

    if (alreadyExists) {
      return { error: new Error("Name already exists") };
    }

    if (!item.qtd || item.qtd < 0) {
      return { error: new Error("Quantity must be greater than 0") };
    }

    if (!item.price || item.price <= 0.0) {
      return { error: new Error("Price must be greater than 0") };
    }

    return await this.baseRepository.add(item);
  }

  async removeItem(id) {
    const indexOfItem = await this.baseRepository.getIndexById(id);
    if (indexOfItem < 0 || indexOfItem == undefined)
      return { error: new Error("Item not found in inventory") };

    return await this.baseRepository.remove(indexOfItem);
  }

  async updateItem(item) {
    const indexOfItem = await this.baseRepository.getIndexById(item.id);
    if (indexOfItem < 0 || indexOfItem == undefined)
      return { error: new Error("Item not found in inventory") };

    if (!item.qtd || item.qtd < 0)
      return { error: new Error("Quantity must be greater than 0") };

    if (!item.price || item.price <= 0.0)
      return { error: new Error("Price must be greater than 0") };

    const result = await this.baseRepository.update(indexOfItem, item);
    return result;
  }
}

module.exports = ItemService;
