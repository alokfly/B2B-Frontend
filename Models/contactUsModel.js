const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
  query: {
    type: String,
  },

  queryTitle: {
    type: String,
  },

  description: {
    type: String,
    require: true,
  },
});

const contactUs = mongoose.model("contactUs", contactUsSchema);
module.exports = contactUs;
