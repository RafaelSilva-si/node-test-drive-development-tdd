const { readFile, writeFile } = require("fs/promises");

class BaseRepository {
  constructor({ file }) {
    this.file = file;
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
}

module.exports = BaseRepository;
