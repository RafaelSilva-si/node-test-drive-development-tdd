const { error } = require("console");
const ItemService = require("../services/itemService");
const path = require("path");

const itemDatabase = path.resolve(__dirname, "../database/items.json");

class ItemController {
  constructor() {
    this.itemService = new ItemService(itemDatabase);
  }

  async getItems(req, res) {
    try {
      const items = await this.itemService.getItems();
      if (items.error) {
        throw items.error;
      }

      res.send(items);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = ItemController;
