const addProduct = require("../Models/addnewproductModel");
const mongoose = require("mongoose");

//method to add a new product
exports.AddnewProduct = (req, res) => {
  const {
    productName,
    category,
    subCategory,
    quality,
    warrantyDetails,
    image,
    productSpec,
    rand1,
    rand2,
  } = req.body;

  addProduct
    .create({
      productName,
      category,
      subCategory,
      quality,
      warrantyDetails,
      image,
      productSpec,
      rand1,
      rand2,
    })
    .then((data) => {
      res.status(201).json({
        msg: "Data added successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        mesaage: err.message || "some error occured while creating data",
      });
    });
};

//method to get all the data
exports.getAllTheProducts = (req, res) => {
  addProduct
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("err", err);
    });
};

//method to get a product by id
exports.getProductByID = (res, req) => {
  const { id } = req.params;
  addProduct
    .findById(id, {})
    .then((data) => {
      res.data(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

//method for updating products
exports.updateProduct = (res, req) => {
  addProduct
    .findByIdAndUpdate(req.params.id, req.body, { upsert: true, new: true })
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "error whie finding data of particular id" });
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

//method for deleting the product
exports.deleteAProduct=((req,res)=>{
    const id = req.params.id;
  
    addProduct
      .findByIdAndDelete(id)
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
          message: "Could not delete data",
        });
      });
});