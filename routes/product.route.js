
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/add", products.create);

  // Retrieve all Product
  router.get("/", products.findAll);

  // Retrieve all Products with promotion
  router.get("/promos/has", products.findAllPromotions);

  // Retrieve a single Product with id
  router.get("/:id", products.findOne);

  // Retrieve a single Product with id
  router.get("/name/:name", products.findByName);

  // Update a Product with id
  router.put("/:id", products.update);

  // Delete a Product with id
  router.delete("/:id", products.delete);

  // Create a new Product
  router.delete("/", products.deleteAll);

  //app.use("/api/products", router);

  module.exports = router;

