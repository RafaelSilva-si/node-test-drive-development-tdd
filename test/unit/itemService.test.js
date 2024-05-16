const { describe } = require("mocha");
const assert = require("assert");
const path = require("path");
const Sinon = require("sinon");

const itemDatabase = path.resolve(__dirname, "../src/database/items.json");

const ItemService = require("../../src/services/itemService");
const baseRepository = require("../../src/repository/baseRepository");

const mocks = {
  addReturnsValid: require("../mocks/add-return-valid.json"),
  addReturnsValidWithoutDesc: require("../mocks/add-return-valid-whitout-desc.json"),
  returnItemAlreadyExists: require("../mocks/return-item-already-exists.json"),
  returnItemUpdated: require("../mocks/return-item-updated.json"),
  getItemReturnValid: require("../mocks/get-item-return-valid.json"),
};

describe("Item Service", () => {
  let itemService;
  let addStub;
  let getAllStub;
  let getByNameStube;
  let removeStub;
  let updateStub;
  let getIndexByIdStub;

  before(async () => {
    getAllStub = Sinon.stub(baseRepository.prototype, "getAll");
    addStub = Sinon.stub(baseRepository.prototype, "add");
    getByNameStube = Sinon.stub(baseRepository.prototype, "getByName");
    removeStub = Sinon.stub(baseRepository.prototype, "remove");
    updateStub = Sinon.stub(baseRepository.prototype, "update");
    getIndexByIdStub = Sinon.stub(baseRepository.prototype, "getIndexById");

    itemService = new ItemService(itemDatabase);
  });

  after(() => {
    Sinon.restore();
  });

  describe("Get All Items", () => {
    it("Should return all items", async () => {
      getAllStub.resolves(mocks.getItemReturnValid);
      const result = await itemService.getItems();
      assert.deepStrictEqual(result, mocks.getItemReturnValid);
    });
  });

  describe("Add Item", () => {
    it("Should add an item and return it", async () => {
      addStub.resolves(mocks.addReturnsValid);
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

    it("Should throw an error if the name already exists", async () => {
      getByNameStube.withArgs("Table").resolves(mocks.returnItemAlreadyExists);

      const item = {
        id: "bdfbf435-25cc-4913-8525-42ff8502c9e6",
        name: "Table",
        qtd: 2,
        price: "0.01",
      };

      const response = await itemService.addItem(item);
      assert.deepStrictEqual(response.error.message, "Name already exists");
    });
  });

  describe("Remove Item", () => {
    it("Should remove an item", async () => {
      removeStub.resolves(true);
      getIndexByIdStub
        .withArgs("edcc6b5f-0f78-422d-a887-8e35bb8845a0")
        .resolves(0);

      const result = await itemService.removeItem(
        "edcc6b5f-0f78-422d-a887-8e35bb8845a0"
      );
      assert.deepStrictEqual(result, true);
    });

    it("should throw error if item not exists in inventory", async () => {
      const result = await itemService.removeItem("dasasdasd-8e35bb8845a0");

      assert.deepStrictEqual(
        result.error.message,
        "Item not found in inventory"
      );
    });
  });

  describe("Update Item", () => {
    it("Should update an item", async () => {
      getIndexByIdStub
        .withArgs("edcc6b5f-0f78-422d-a887-8e35bb8845a0")
        .resolves(1);
      updateStub.withArgs(1).resolves(mocks.returnItemUpdated);

      const item = {
        id: "edcc6b5f-0f78-422d-a887-8e35bb8845a0",
        name: "Sausages",
        qtd: 7,
        price: "330.00",
        describe:
          "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      };

      const result = await itemService.updateItem(item);
      assert.deepStrictEqual(result, item);
    });

    it("Should return error if item not exists in inventory", async () => {
      const item = {
        id: "123123123-1231-1231-1231-123123123123",
        name: "Sausages",
        qtd: 7,
        price: "330.00",
        describe:
          "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      };

      const result = await itemService.updateItem(item);
      assert.deepStrictEqual(
        result.error.message,
        "Item not found in inventory"
      );
    });

    it("Should return error if quantity is less than 0", async () => {
      const item = {
        id: "edcc6b5f-0f78-422d-a887-8e35bb8845a0",
        name: "Sausages",
        qtd: -1,
        price: "330.00",
        describe:
          "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      };

      const result = await itemService.updateItem(item);
      assert.deepStrictEqual(
        result.error.message,
        "Quantity must be greater than 0"
      );
    });

    it("Should return error if price is less than 0", async () => {
      const item = {
        id: "edcc6b5f-0f78-422d-a887-8e35bb8845a0",
        name: "Sausages",
        qtd: 7,
        price: "-0.01",
        describe:
          "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      };

      const result = await itemService.updateItem(item);
      assert.deepStrictEqual(
        result.error.message,
        "Price must be greater than 0"
      );
    });
  });
});
