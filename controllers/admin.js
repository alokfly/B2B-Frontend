const admin=require("../Models/adminModel")
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// method for  registering admin
exports.adminSignup = (req, res) => {
    const { name,
         email,
        password,
        contact,
         address,
        stateName,
         pincode } = req.body;

         bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              return res.json({
                msg: "Somthing Wrong, Try Later !",
                err: err,
              });
            } else {
          admin
          .create({
            name: name,
            email: email,
            password: hash,
            contact: contact,
            address: address,
            stateName: stateName,
            pincode: pincode,
          })
          .then((result) => {
            // res.render("signupForm")
            res.status(201).json({
              msg: "Data Added successfully",
              result: result,
            });
          })
          .catch((err) => {
            res.status(500).send({
              mesaage: err.message || "some error occured while creating Admin",
            });
          });
      }
    });
  };

  //Method that get all the admins that are stored at the database
  exports.getAllAdmins = (req, res) => {

    admin
      .find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send("err" ,err)
      });

  }

  //Method to get an admin by ID
  exports.getAdminById =((req,res)=>{
    const {id} = req.params;
    admin.findById(id,{}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send(err)
    })

  })

  //Method for updating data
  exports.updateAdmin = (req, res) => {
    const id = req.params.id;
    admin.findByIdAndUpdate(id, req.body, { upsert: true, new: true })
      .then((data) => {
        if (!data) {
          res.status(400).send({ message: "error while finding User" });
        } else {
          res.status(200).json({
            msg: "Data updated successfully",
            data: data,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error User update information" });
      });
  };

  //Method to Delete an admin
  exports.deleteAdmin = (req, res) => {
    const id = req.params.id;
  
    admin
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
  };