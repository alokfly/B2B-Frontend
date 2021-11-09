const cart=require("../Models/cartModel")


//method to create a cart
exports.createCart = (req, res, next) => {
    const { productObjectId, qty, totalPrice, status } = req.body;
  
    cart.create({
        productObjectID:productObjectId,
        qty:qty,
        totalPrice:totalPrice,
        status:status,
    })
      .then((data) => {
        res.status(201).json({
          msg: "Data created successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          mesaage: err.message || "some error occured while creating data",
        });
      });
  };
  


//method to get all products in a  cart
exports.getAllInACart = (req, res) => {
    cart
      .find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send("err" ,err)
      });

  }


//method to get a product in a cart by id
exports.getCartById =((req,res)=>{
    const {id} = req.params;
    cart.findById(id,{}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send(err)
    })

  })



//method to update a cart
exports.updateACart = (req, res, next) => {
    cart.findByIdAndUpdate(
      req.body._id,
      { qty: req.body.qty },
      { upsert: true, new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(400).send({ message: "error whie finding data" });
        } else {
          res.status(200).json({
            msg: "Data Updated successfully",
            data: data,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error in updating information" });
      });
  };
  



//method to delete product in a cart
exports.deleteACart= (req, res, next) => {
        cart.findByIdAndDelete(req.params.id)
          .then((data) => {
            if (!data) {
              res
                .status(404)
                .send({ message: `Cannot Delete. Maybe something is wrong` });
            } else {
              res.send({
                message: "Data deleted successfully!",
                data: data,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete",
            });
          });
      };
      ;