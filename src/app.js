const express = require("express");
const { Router } = require("express");

const app = express();
const port = 4000;

const itemController = require("./controllers/itemController");
const itemService = require("./services/itemService");

const itemControllerInstance = new itemController(itemService);

app.get("/items", (req, res) => itemControllerInstance.getItems(req, res));

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = {
  app,
  server,
};
