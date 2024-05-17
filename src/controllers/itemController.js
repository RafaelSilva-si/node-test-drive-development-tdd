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

  async addItem(req, res) {
    try {
      const item = await this.itemService.addItem(req.body);
      if (item.error) {
        throw { error: item.error, status: item.status };
      }
      res.status(201).send(item);
    } catch (error) {
      res.status(error.status || 500).send(error.error.message);
    }
  }

  async deleteItem(req, res) {
    try {
      const item = await this.itemService.removeItem(req.params.id);
      if (item.error) {
        throw { error: item.error, status: item.status };
      }
      res.status(200).send(item);
    } catch (error) {
      res.status(error.status || 500).send(error.error.message);
    }
  }

  async updateItem(req, res) {
    try {
      const item = await this.itemService.updateItem(req.params.id, req.body);
      if (item.error) {
        throw { error: item.error, status: item.status };
      }
      res.status(200).send(item);
    } catch (error) {
      res.status(error.status || 500).send(error.error.message);
    }
  }
}

module.exports = ItemController;
