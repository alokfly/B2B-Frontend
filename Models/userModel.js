const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and model

const userSchema = new Schema(
  {
    ownerName: {
      type: String,
      require: true,
    },
    cName: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    state: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    profileImage: [Object],
    brandIcon: [Object],
    businessPhoto: [Object],
    introduction: {
      type: String,
    },
    address: {
      type: String,
    },
    gst: {
      type: String,
    },
  }
  //   { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
