const request = require("supertest");
const assert = require("assert");
const sinon = require("sinon");

const ItemService = require("./../../src/services/itemService");
const BaseRepository = require("./../../src/repository/baseRepository");

const faker = require("faker");
const mocks = {
  getItemReturnValid: require("./../mocks/get-item-return-valid.json"),
  addReturnsValid: require("./../mocks/add-return-valid.json"),
  updateItemReturnValid: require("./../mocks/return-item-updated.json"),
};

describe("API - Items", () => {
  let { app, server } = require("./../../src/app");

  before(() => {
    sinon
      .stub(BaseRepository.prototype, "getAll")
      .resolves(mocks.getItemReturnValid);

    sinon.stub(BaseRepository.prototype, "add").resolves(mocks.addReturnsValid);
    sinon
      .stub(BaseRepository.prototype, "getIndexById")
      .withArgs("edcc6b5f-0f78-422d-a887-8e35bb8845a0")
      .resolves(0);
    sinon.stub(BaseRepository.prototype, "remove").resolves(true);
    sinon
      .stub(BaseRepository.prototype, "update")
      .resolves(mocks.updateItemReturnValid);
  });

  after((done) => {
    server.close(done);
    sinon.restore();
  });

  describe("GET /items", () => {
    it("should return a list of items", async () => {
      const response = await request(app).get("/items");
      assert.deepStrictEqual(response.status, 200);
    });

    it("should throw an error if the item is not found", async () => {
      sinon.stub(ItemService.prototype, "getItems").resolves({
        error: new Error("Server error"),
      });

      const response = await request(app).get("/items");
      assert.deepStrictEqual(response.error.text, "Server error");
      assert.deepStrictEqual(response.status, 500);
    });
  });

  describe("POST /items", () => {
    it("should add an item and return it", async () => {
      const response = await request(app)
        .post("/items")
        .send({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          qtd: faker.datatype.number({ min: 1, max: 10 }),
          price: faker.commerce.price(),
          describe: faker.commerce.productDescription(),
        });

      assert.deepStrictEqual(response.status, 201);
    });

    it("should throw an error if the item already exists", async () => {
      const response = await request(app).post("/items").send({
        id: "bdfbf435-25cc-4913-8525-42ff8502c9e6",
        name: "Sausages",
        qtd: 7,
        price: "360.00",
        describe:
          "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      });

      assert.deepStrictEqual(response.status, 409);
      assert.deepStrictEqual(response.text, "Item already exists");
    });

    it("should throw an error if the quantity is less than 0", async () => {
      const response = await request(app).post("/items").send({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        qtd: -1,
        price: faker.commerce.price(),
        describe: faker.commerce.productDescription(),
      });

      assert.deepStrictEqual(response.status, 400);
      assert.deepStrictEqual(response.text, "Quantity must be greater than 0");
    });

    it("should throw an error if the price is less than 0", async () => {
      const response = await request(app)
        .post("/items")
        .send({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          qtd: faker.datatype.number({ min: 1, max: 10 }),
          price: "-0.01",
          describe: faker.commerce.productDescription(),
        });

      assert.deepStrictEqual(response.status, 400);
      assert.deepStrictEqual(response.text, "Price must be greater than 0");
    });
  });

  describe("DELETE /items/:id", () => {
    it("should delete an item and return it", async () => {
      const response = await request(app).delete(
        "/items/edcc6b5f-0f78-422d-a887-8e35bb8845a0"
      );

      assert.deepStrictEqual(response.status, 200);
    });
  });

  describe("PUT /items/:id", () => {
    it("should update an item and return it", async () => {
      const response = await request(app)
        .put("/items/edcc6b5f-0f78-422d-a887-8e35bb8845a0")
        .send({
          id: "edcc6b5f-0f78-422d-a887-8e35bb8845a0",
          name: "Sausages",
          qtd: 7,
          price: "1",
          describe:
            "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        });

      assert.deepStrictEqual(response.status, 200);
    });
  });
});
