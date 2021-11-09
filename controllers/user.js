const user = require("../Models/userModel");
const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();
const smsKey = process.env.SMS_SECRET_KEY;
// var jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

/*if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}*/

// method for the usersignup/for the person to register

exports.sendOtp = async (req, res) => {
  const phone = req.body.phone;
  const otp = Math.floor(1000 + Math.random() * 9000);
  const ttl = 2 * 60 * 1000;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
  const fullHash = `${hash}.${expires}`;

  res.status(200).send({ phone, hash: fullHash, otp });
};

exports.verifyOtp = async (req, res) => {
  const phone = req.body.phone;
  const hash = req.body.hash;
  const otp = req.body.otp;
  let [hashValue, expires] = hash.split(".");

  let now = Date.now();
  if (now > parseInt(expires)) {
    return res.status(504).send({ msg: "Timeout. Please try again" });
  }
  let data = `${phone}.${otp}.${expires}`;
  let newCalculatedHash = crypto
    .createHmac("sha256", smsKey)
    .update(data)
    .digest("hex");
  if (newCalculatedHash === hashValue) {
    console.log("user confirmed");

    return res.status(201).json({ msg: "Login successfull", data: phone });
  } else {
    console.log("not authenticated");
    return res.status(400).send({ verification: false, msg: "Incorrect OTP" });
  }
};

exports.userSignup = (req, res) => {
  const { ownerName, cName, email, state, city } = req.body;
  user
    .create({
      ownerName,
      cName,
      email,
      state,
      city,
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
  // }
  // });
};

exports.addMoreDetail = async (req, res) => {
  const profileImage = req.files.profileImage;
  const brandIcon = req.files.brandIcon;
  const businessPhoto = req.files.businessPhoto;
  const { introduction, address, gst, email } = req.body;

  try {
    const response = await user.findOneAndUpdate(
      { email },
      {
        introduction,
        address,
        gst,
      }
    );
    return res.status(200).json({ msg: "Data successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

//Method update the user data/details
exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  user
    .findByIdAndUpdate(id, req.body, { upsert: true, new: true })
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

//Methods gets all users
exports.getUsers = (req, res) => {
  user
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("error:", err);
    });
};

//method to get a user using id
exports.getUserById = (req, res) => {
  const { id } = req.params;
  user
    .findById(id, {})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

//method for deleting the user
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  user
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete. Maybe already deleted` });
      } else {
        res.send({
          message: "User deleted successfully!",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User",
      });
    });
};
