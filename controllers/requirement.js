const requirement=require("../Models/requirementModel")


//method to add requirements
exports.addRequirements = (req, res, next) => {
    // const { error, isValid } = validateRegisterInput(req.body);
  
    // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(error);
    // }
  
    const {
      userObjectId,
      tagObjectId,
      name,
      desc,
      image,
      status,
      city,
      stateName,
    } = req.body;
    requirement.create({
        userObjectId: userObjectId,
        tagObjectId: tagObjectId,
        name: name,
        desc: desc,
        image: image,
        status: status,
        city: city,
        stateName: stateName,
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
  };
  

//method to get all requirements
exports.getAllRequirements = (req, res) => {
      requirement.find()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.send({ message: err.message });
        });
    }
  
  


//method to get requirements by id
exports.getRequirementByID = (req, res) => {
    if (req.params.id) {
      const id = req.params.id;
      requirement.findById(id)
        .populate("Vendor")
        .then((data) => {
          if (!data) {
            res.status(400).send({
              message: `data  may not present`,
            });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res.status(500).send({ message: "error while retriving the data" });
        });
    }
}


//method to update requirements

exports.updateRequirements = (req, res, next) => {
    // const { error, isValid } = validateRegisterInput(req.body);
  
    // // Check Validation
  
    // if (!isValid) {
    //   return res.status(400).json(error);
    // }
  
    requirement.findByIdAndUpdate(req.params.id, req.body, { upsert: true, new: true })
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
  
//method to delete the requirements

exports.deleteRequirement = (req, res) => {
    const id = req.params.id;
  
    requirement
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
  