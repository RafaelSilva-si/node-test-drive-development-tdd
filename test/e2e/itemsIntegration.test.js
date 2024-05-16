const request = require("supertest");
const assert = require("assert");
const sinon = require("sinon");

const ItemService = require("./../../src/services/itemService");

describe("API - Items", () => {
  let { app, server } = require("./../../src/app");

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
});
