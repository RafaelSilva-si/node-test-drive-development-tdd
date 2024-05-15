const { readFile, writeFile } = require("fs/promises");

class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async getById(id) {
    try {
      const content = JSON.parse(await readFile(this.file));
      return content.find((item) => item.id === id);
    } catch (error) {
      throw error;
    }
  }

  async getByName(name) {
    try {
      const content = JSON.parse(await readFile(this.file));
      return content.find((item) => item.name === name);
    } catch (error) {
      throw error;
    }
  }

  async add(item) {
    try {
      const content = JSON.parse(await readFile(this.file));
      content.push(item);

      await writeFile(this.file, JSON.stringify(content));
      return item;
    } catch (error) {
      throw error;
    }
  }

  async remove(index) {
    try {
      const content = JSON.parse(await readFile(this.file));
      content.splice(index, 1);

      await writeFile(this.file, JSON.stringify(content));
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseRepository;
