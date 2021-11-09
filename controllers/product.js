const product=require("../Models/productModel")


//method to create/add a product
exports.addProduct = (req, res, next) => {
   
    const {
      name,
      sellerName,
      mrp,
      price,
      image,
      desc,
      status,
      screenSize,
      processor,
      ram,
      hardDisk,
      color,
      warranty,
      categoryObjectId,
      vendorObjectId,
      brandObjectId,
    } = req.body;
    product.create({
        name: name,
        sellerName: sellerName,
        mrp: mrp,
        price: price,
        image: image,
        desc: desc,
        screenSize: screenSize,
        processor: processor,
        ram: ram,
        hardDisk: hardDisk,
        color: color,
        warranty: warranty,
        vendorObjectId: vendorObjectId,
        categoryObjectId: categoryObjectId,
        brandObjectId: brandObjectId,
        status: status,
    })
      .then((result) => {
        res.status(201).json({
          msg: "Data Added successfully",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          mesaage: err.message || "some error occured while creating data",
        });
      });
  };
  
//method to get all products
exports.getAllProducts = (req, res) => {
    if (req.query.id) {
     
      product.find(id)
        .then((data) => {
          if (!data) {
            res.status(400).send({
              message: `Data may not present`,
            });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res.status(500).send({ message: "error while retriving the data" });
        });
    } else {
        product.find()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.send({ message: err.message });
        });
    }
  };

//methods to get a product by ID
exports.getProductByID = (req, res) => {
    if (req.params.id) {
      const id = req.params.id;
      product.findById(id)
        .populate("vendorObjectID", "categoryObjectID", "brandObjectID")
  
        .then((data) => {
          if (!data) {
            res.status(400).send({
              message: `Data may not present`,
            });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res.status(500).send({ message: "error while retriving the data" });
        });
    } else {
        product.find()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.send({ message: err.message });
        });
    }
  };
  
//method to update products
exports.updateProduct = (req, res, next) => {
    product.findByIdAndUpdate(req.params.id, req.body, {
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
  


//method to delete products
exports.deleteProduct = (req, res) => {
    const id = req.params.id;
  
    product
      .findByIdAndDelete(id)
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
          message: "Could not delete data",
        });
      });
  };