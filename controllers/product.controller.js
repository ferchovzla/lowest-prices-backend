const Product = require('../models/products');
//const db = require("../models");
//const Product = db.products;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let dateTime = new Date();

  // Create a Product
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    code: req.body.code,
    price:  req.body.price, 
    temp_price: req.body.temp_price,
    currency: req.body.currency,
    is_promotion: req.body.is_promotion,
    begin_promotion_date: req.body.begin_promotion_date,
    end_promotion_date: req.body.end_promotion_date,
    weight: req.body.weight,
    unit: req.body.unit,
    rate: req.body.rate,  
    enabled: req.body.enabled,
    category: req.body.category, 
    image: req.body.image,
    created_at: dateTime,
    updated_at: dateTime
  });

  // Save Product in the database
  product
    .save(product)
    .then(data => {
      res.status(200).send({ message: "Product saved successfully: "+req.body.name, data:data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  console.log("findAll ....");
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Product.find(condition)
    .then(data => {
      console.log(".then(data)... "+data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("findOne ID:"+id);
  Product.findById(id)
    .exec()
    .then((product) => res.json(product))
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

// Find a single Product with an id
exports.findByName = (req, res) => {
  const nameToFind = req.params.name;
 console.log("findByName ...."+nameToFind);
  Product.find({name: nameToFind})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Product with name " + nameToFind });
      else res.status(200).send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with name=" + nameToFind });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      } else {
        res.send({
          message: "Product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Product were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    });
};

// Find all Products with promotion
exports.findAllPromotions = (req, res) => {
  console.log("Find promotions....");
  Product.find({ is_promotion: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};
