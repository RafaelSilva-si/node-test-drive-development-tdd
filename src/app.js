const express = require("express");

const app = express();
const port = 4000;

app.use(express.json());

const itemController = require("./controllers/itemController");
const itemService = require("./services/itemService");

const itemControllerInstance = new itemController(itemService);

app.get("/items", (req, res) => itemControllerInstance.getItems(req, res));
app.post("/items", (req, res) => itemControllerInstance.addItem(req, res));
app.delete("/items/:id", (req, res) =>
  itemControllerInstance.deleteItem(req, res)
);
app.put("/items/:id", (req, res) =>
  itemControllerInstance.updateItem(req, res)
);

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = {
  app,
  server,
};
