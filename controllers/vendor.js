const vendor = require("../Models/vendorModel");

exports.enterNumber = (req, res) => {
  const { phone } = req.body;
  vendor
    .create({
      phone,
    })
    .then((result) => {
      res.status(201).json({
        msg: "Data Added successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        mesaage: err.message || "some error occured while creating data",
      });
    });
};
