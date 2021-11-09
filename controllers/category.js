const category=require("../Models/categoryModel");


//method to create a category
exports.createCategory = (req, res, next) => {

    const { vendorObjectId, name, image, status, desc } = req.body;
  
    category.create({
        vendorObjectId: vendorObjectId,
        name: name,
        image: image,
        desc: desc,
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
  };
  

//method to get all the category
exports.getAllCategory= (req,res)=>
{
    category
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("err" ,err)
    });
}

//method to get category by ID
exports.getAllCategoryByID = (req,res) =>
{
    const {id} = req.params;
    category.findById(id,{}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send(err)
    })

}

//method to update a category
exports.updateCategory = (req, res, next) => {
    
    category.findByIdAndUpdate(req.params.id, req.body,{upsert:true,new:true})
      .then((data) => {
        if (!data) {
          res
            .status(400)
            .send({ message: "error whie finding data" });
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


//method to delete a category
exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  category
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete Maybe something is wrong` });
      } else {
        res.send({
          message: "Category is deleted successfully!",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category",
      });
    });
};