const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    vendorObjectId: {
      type:String
    },

    name: {
      type: String,
      require: true,
    },

    logo: {
      type: String,
    },

    post: {
      type: String,
    },

    status: {
      type: String,
      require: true,
      default: "Active",
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
