const request = require("supertest");
const assert = require("assert");

describe("API - Items", () => {
  let { app, server } = require("./../../src/app");

  after((done) => {
    server.close(done);
  });

  describe("GET /items", () => {
    it("should return a list of items", async () => {
      const response = await request(app).get("/items");
      assert.deepStrictEqual(response.status, 200);
    });
  });
});
