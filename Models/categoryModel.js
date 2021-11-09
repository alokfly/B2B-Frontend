const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
      vendorObjectId: 
        {
          type: String,

        },
      
  
      name: {
        type: String,
        require: true,
      },
  
      image: {
        type: String,
      },
  
      desc: {
        type: String,
      },
  
      status: {
        type: String,
        require: true,
        default: "Active",
      },
    },
    { timestamps: true }
  );
  
  const Category = mongoose.model("Category", categorySchema);
  
  module.exports = Category;
  