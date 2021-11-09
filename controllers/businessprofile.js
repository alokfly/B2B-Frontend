const businessProfile=require("../Models/businessprofileModel")

//method for creating a business profile
exports.createBusinessProfile = (req, res, next) => {
    
    const {
      vendorObjectId,
      ownerName,
      companyName,
      alternateContact,
      pincode,
      address,
      gstin,
      email,
      businessIntro,
      businessLogo,
      officeImage,
      status,
    } = req.body;

    businessProfile.create({
      vendorObjectId: vendorObjectId,
      ownerName: ownerName,
      companyName: companyName,
      alternateContact: alternateContact,
      pincode: pincode,
      address: address,
      gstin: gstin,
      email: email,
      businessIntro: businessIntro,
      businessLogo: businessLogo,
      officeImage: officeImage,
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
          mesaage: err.message || "some error occured while creating data",
        });
    });
}


//method for getting all the business profile stored at the database
  exports.getAllBusinessProfile = (req, res) => {
    businessProfile
      .find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send("err" ,err)
      });
  }


//method for getting the business profile by ID
exports.getBusinessProfileByID =((req,res)=>{
    const {id} = req.params
    businessProfile.findById(id,{}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send(err)
    })

  })

//method for updating the  business profile
exports.updateBusinessProfile = (req, res, next) => {
    // Check Validation
    // const { error, isValid } = validateRegisterInput(req.body);
  
    // if (!isValid) {
    //   return res.status(400).json(error);
    // }
  
    businessProfile.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      new: true,
    })
      .then((data) => {
        if (!data) {
          res
            .status(400)
            .send({ message: "error whie finding data of particular id" });
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


//method for deleting the business profile
exports.deleteBusinessProfile = (req, res) => {
    const id = req.params.id;
    businessProfile.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            msg: "Cannot delete, maybe something is wrong",
          });
        } else {
          res.send({
            msg: "data deleted successfully",
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
  