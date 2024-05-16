const { readFile, writeFile } = require("fs/promises");

class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async getAll() {
    try {
      return JSON.parse(await readFile(this.file));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getIndexById(id) {
    try {
      const content = JSON.parse(await readFile(this.file));
      return content.findIndex((item) => item.id === id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByName(name) {
    try {
      const content = JSON.parse(await readFile(this.file));
      return content.find((item) => item.name === name);
    } catch (error) {
      throw new Error(error);
    }
  }

  async add(item) {
    try {
      const content = JSON.parse(await readFile(this.file));
      content.push(item);

      await writeFile(this.file, JSON.stringify(content));
      return item;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(index) {
    try {
      const content = JSON.parse(await readFile(this.file));
      content.splice(index, 1);

      await writeFile(this.file, JSON.stringify(content));
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(index, item) {
    try {
      const content = JSON.parse(await readFile(this.file));
      content[index] = item;
      await writeFile(this.file, JSON.stringify(content));
      return item;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = BaseRepository;
