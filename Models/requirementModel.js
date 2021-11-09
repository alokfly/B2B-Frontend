const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const reqSchema = new Schema(
  {
    userObjectId: {
      type: String,

    },
    tagObjectId: {
      type: String,

    },

    name: {
      type: String,
    },

    desc: {
      type: String,
    },

    image: {
      type: String,
    },

    city: {
      type: String,
    },

    stateName: {
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

const Requirement = mongoose.model("Requirement", reqSchema);

module.exports = Requirement;
