const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const businessProfileSchmea = new Schema(
  {
    vendorObjectId: {
      type:String
    },

    ownerName: {
      type: String,
    },

    companyName: {
      type: String,
    },

    alternateContact: {
      type: String,
    },

    pincode: {
      type: String,
    },

    address: {
      type: String,
    },

    gstin: {
      type: String,
    },

    email: {
      type: String,
    },

    businessIntro: {
      type: String,
    },

    businessLogo: {
      type: String,
    },

    officeImage: {
      type: String,
    },

    status: { type: String, require: true, default: "Active" },
  },
  { timestamps: true }
);

const BusinessProfile = mongoose.model("BusinessProfile",businessProfileSchmea);

module.exports = BusinessProfile;
