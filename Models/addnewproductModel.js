const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and model
const newProductSchema = new Schema({
  productName: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  subCategory: {
    type: String,
    require: true,
  },
  quality: {
    type: String,
    require: true,
  },
  warrantyDetails: {
    type: String,
    require: true,
    unique: true,
  },

  image: {
    type: String,
  },

  productSpec: {
    type: String,
    require: true,
  },
  rand1: {
    type: String,
    require: true,
  },
  rand2: {
    type: String,
    require: true,
    
  },
});

const newproduct = mongoose.model("newproduct", newProductSchema);
module.exports = newproduct;
