const { describe } = require("mocha");
const assert = require("assert");
const faker = require("faker");
const path = require("path");
const Sinon = require("sinon");

const itemDatabase = path.resolve(__dirname, "../src/database/items.json");

const ItemService = require("../src/services/itemService");
const baseRepository = require("../src/repository/baseRepository");

const mocks = {
  addReturnsValid: require("./mocks/add-return-valid.json"),
};

describe("Item Service", () => {
  let itemService;
  let addStub;

  before(async () => {
    addStub = Sinon.stub(baseRepository.prototype, "add");
    addStub.resolves(mocks.addReturnsValid);

    itemService = new ItemService(itemDatabase);
  });

  after(() => {
    Sinon.restore();
  });

  describe("Add Item", () => {
    it("Should add an item and return it", async () => {
      const item = {
        id: "bdfbf435-25cc-4913-8525-42ff8502c9e6",
        name: "Sausages",
        qtd: 7,
        price: "360.00",
        describe:
          "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      };

      assert.deepStrictEqual(item, await itemService.addItem(item));
    });
  });
});
