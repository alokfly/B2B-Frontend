const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const registerSchema = new Schema(
  {
    phone: {
      type: Number,
      require: true,
      unique: true,
    },

    // otp: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

const Register = mongoose.model("Register", registerSchema);
module.exports = Register;