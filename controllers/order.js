const order = require ("../Models/orderModel")
const asyncHandler = require("express-async-handler");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

      
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Found");
    return;
  } else {

  order.create({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  })
  
  const createOrder = await order.save();
  res.status(201).json(createOrder);

  }
});

//method to get all orders 
exports.getAllOrders = asyncHandler(async (req, res) => {
    const orders = await order.find({ user: req.user._id });
    res.json(orders);
  });


// method to get the order by id
exports.getOrderById = asyncHandler(async (req, res) => {
    const order = await order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  });
  



//method to update the order
exports.updateOrder = asyncHandler(async (req, res) => {
    const order = await order.findById(req.params.id);
    if (order) {
      (order.isPaid = true),
        (order.paidAt = Date.now()),
        (order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        });
      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  });


//method to delete the order
exports.deleteOrder = asyncHandler(async (req, res) => {
    const id = req.params.id;
  
    order.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Cannot Delete Order Details` });
        } else {
          res.send({
            message: "Order Detail deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Order Details",
        });
      });
  });
  