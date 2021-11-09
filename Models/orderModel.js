const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      required: true,
      type: String,

    },
    orderItems: [
      {
        name: {
          type: String,
        },
        qty: {
          type: Number,
        },
        image: {
          type: String,
        },
        price: {
          type: Number,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
      },
      landMark: {
        type: String,
      },
      city: {
        type: String,
      },
      stateName: {
        type: String,
      },
      postalcode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      upload_status: {
        type: String,
      },
      email_address: {
        type: String,
      },
    },
    taxPrice: {
      type: String,
      defualt: "0.0",
    },
    shippingPrice: {
      type: String,
      default: 0.0,
    },
    totalPrice: {
      type: String,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDeliverd: {
      type: Boolean,
      default: false,
    },
    deliverAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
