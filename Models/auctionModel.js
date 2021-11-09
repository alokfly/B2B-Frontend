const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auctionSchema = new Schema(
  {
  
    title: {
      type: String,
    },

    photo: {
      type: String,
    },

    desc: {
      type: String,
    },
    sellingPrice: {
      type: String,
    },
    startingPrice: {
      type: String,
    },
    diffInBids: {
      type: String,
    },
    endingDate: {
      type: String,
    },
    productName: {
      type: String,
    },
    qty: {
      type: String,
    },
    warranty: {
      type: String,
    },

    status: {
      type: String,
      require: true,
      default: "Active",
    },
  },
);

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;
