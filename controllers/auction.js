const Auction = require('../Models/auctionModel');

//Method for creating auction
exports.createAuction = (req, res, next) => {
    const {
      title,
      photo,
      desc,
      sellingPrice,
      startingPrice,
      diffInBids,
      endingDate,
      productName,
      qty,
      warranty,
      status,
    } = req.body;

    Auction
          .create({
            title: title,
            photo: photo,
            desc: desc,
            sellingPrice: sellingPrice,
            startingPrice: startingPrice,
            diffInBids: diffInBids,
            endingDate: endingDate,
            productName: productName,
            qty: qty,
            warranty: warranty,
            status: status,
          })
      .then((data) => {
        res.status(201).json({
          msg: "Data added successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some error occured while creating data",
        });
      });

  };

  //Method used to find all auction
  exports.getAllAuctions = (req, res) => {
    Auction
      .find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send("error:", err);
      });
  };

   //method to get a auction  using id
   exports.getAuctionById =((req,res)=>{
    const {id} = req.params
    Auction.findById(id,{}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send(err)
    })

  })

  //Method to update auction
exports.updateAuction = (req, res, next) => {

  Auction.findByIdAndUpdate(req.params.id, req.body, {
    upsert: true,
    new: true,
  })
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

//Method to delete Auction
exports.deleteAuction = (req, res) => {
    const id = req.params.id;
    Auction
      .findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: `Cannot Delete Maybe something is wrong` });
        } else {
          res.send({
            message: "data is deleted successfully!",
            data: data,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete data",
        });
      });
  };
  

  