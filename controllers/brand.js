const brand=require("../Models/brandModel")
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Method for adding the brand 
exports.createBrand = (req, res, next) => {
    // const { error, isValid } = validateRegisterInput(req.body);
  
    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(error);
    // }
  
    const {  vendorObjectId,name, logo, post, status } = req.body;
  
    brand.create({
      vendorObjectId: vendorObjectId,
      name,
      logo,
      post,
      status,
    })
      .then((data) => {
        res.status(201).json({
          msg: "Data added successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          mesaage: err.message || "some error occured while creating data",
        });
      });
  };
  
  //Method to get all the brands stored on  the database
  exports.getAllBrands = (req, res) => {
    brand
      .find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send("err" ,err)
      });
  }

  //method gets the brand by id
  exports.getBrandByID =((req,res)=>{
    const {id} = req.params
    brand.findById(id,{}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send(err)
    })

  })


  
//method for updating the brands
exports.updateBrands = (req, res, next) => {
  brand.findByIdAndUpdate(req.params.id, req.body,{upsert:true,new:true})
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "error whie finding data" });
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


//method for deleting the brand
exports.deleteBrand = (req, res) => {
    const id = req.params.id;
    brand.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: `Cannot Delete Maybe something is wrong` });
        } else {
          res.send({
            message: "Brand is deleted successfully!",
            data: data,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Brand",
        });
      });
  };
  