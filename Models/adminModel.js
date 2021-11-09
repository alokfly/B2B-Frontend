const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and model
const adminSchema = new Schema(
  {
    name: {
      type: String,
      require: true,

    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },

    contact: {
      type: String,
      require: true,
    },

    address: {
      type: String,
      require: true,
      default: 0,
    },
    stateName: {
        type: String,
        require: true,
        default: 0,
      },
      pincode: {
        type: String,
        require: true,
        default: 0,
      }
      
  }

);

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;

