const contactUs = require("../Models/contactUsModel");

//method to create a cart
exports.addQuery = (req, res, next) => {
  const { query, queryTitle, description } = req.body;

  contactUs
    .create({
      query,
      queryTitle,
      description,
    })
    .then((data) => {
      res.status(201).json({
        msg: "Data created successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        mesaage: err.message || "some error occured while creating data",
      });
    });
};

//method to get all products in a  cart
exports.getAllQueries = (req, res) => {
  contactUs
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("err", err);
    });
};

//method to get a product in a cart by id
exports.getQueryById = (req, res) => {
  const { id } = req.params;
  contactUs
    .findById(id, {})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

//method to update a cart
exports.updateAQuery = (req, res, next) => {
  contactUs
    .findByIdAndUpdate(
      req.body._id,
      { qty: req.body.qty },
      { upsert: true, new: true }
    )
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "error whie finding data" });
      } else {
        res.status(200).json({
          msg: "Data Updated successfully",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error in updating information" });
    });
};

//method to delete product in a cart
exports.deleteQuery = (req, res, next) => {
  cart
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete. Maybe something is wrong` });
      } else {
        res.send({
          message: "Data deleted successfully!",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
