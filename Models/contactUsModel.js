const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactUsSchema = new Schema(
  {
   
    query: {
      type: String,
    },

    queryTitle: {
      type: String,
    },

    descIssue: {
      type: String,
      require: true,
      default: "Active",
    },
  },
);

const contactUs = mongoose.model("contactUs", contactUsSchema);
module.exports = contactUs;
