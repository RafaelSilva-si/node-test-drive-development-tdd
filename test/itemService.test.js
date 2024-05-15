const { describe } = require("mocha");
const assert = require("assert");
const faker = require("faker");
const path = require("path");
const Sinon = require("sinon");

const itemDatabase = path.resolve(__dirname, "../src/database/items.json");

const ItemService = require("../src/services/itemService");
const baseRepository = require("../src/repository/baseRepository");
const { error } = require("console");

const mocks = {
  addReturnsValid: require("./mocks/add-return-valid.json"),
  addReturnsValidWithoutDesc: require("./mocks/add-return-valid-whitout-desc.json"),
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

    it("Should add an item and return it without description", async () => {
      addStub.resolves(mocks.addReturnsValidWithoutDesc);
      const item = {
        id: "bdfbf435-25cc-4913-8525-42ff8502c9e6",
        name: "Sausages",
        qtd: 7,
        price: "360.00",
      };

      assert.deepStrictEqual(item, await itemService.addItem(item));
    });

    it("Should throw an error if the quantity is less than 0", async () => {
      const item = {
        id: "bdfbf435-25cc-4913-8525-42ff8502c9e6",
        name: "Sausages",
        qtd: -1,
        price: "360.00",
      };

      const response = await itemService.addItem(item);
      assert.deepStrictEqual(
        response.error.message,
        "Quantity must be greater than 0"
      );
    });

    it("Should throw an error if the price is less than 0 or null", async () => {
      const item = {
        id: "bdfbf435-25cc-4913-8525-42ff8502c9e6",
        name: "Sausages",
        qtd: 2,
        price: "-0.01",
      };

      const response = await itemService.addItem(item);
      assert.deepStrictEqual(
        response.error.message,
        "Price must be greater than 0"
      );
    });
  });
});
