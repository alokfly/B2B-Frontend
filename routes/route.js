const express = require("express");
var multer = require("multer");
const path = require("path");

const router = express.Router();

/*============================================================
     Controllers imports 
=============================================================*/
const user = require("../controllers/user");
const admin = require("../controllers/admin");
const auction = require("../controllers/auction");
const brand = require("../controllers/brand");
const businessProfile = require("../controllers/businessprofile");
const cart = require("../controllers/cart");
const category = require("../controllers/category");
const order = require("../controllers/order");
const product = require("../controllers/product");
const requirement = require("../controllers/requirement");
const vendor = require("../controllers/vendor");
const contactUs = require("../controllers/contactUs");
const addProduct = require("../controllers/Addnewproduct");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

var uploadMultiple = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "brandIcon", maxCount: 10 },
  { name: "businessPhoto", maxCount: 10 },
]);

/*=============================================================
      routers for post data
================================================================*/
router.post("/sendOtp", user.sendOtp);
router.post("/verifyOtp", user.verifyOtp);
router.post("/signup", user.userSignup);
router.post("/addMoreDetail", uploadMultiple, user.addMoreDetail);
router.post("/adminSignup", admin.adminSignup);
router.post("/createAuction", auction.createAuction);
router.post("/createbrand", brand.createBrand);
router.post("/createBusinessProfile", businessProfile.createBusinessProfile);
router.post("/createCart", cart.createCart);
router.post("/createCategory", category.createCategory);
router.post("/createOrder", order.createOrder);
router.post("/addProduct", product.addProduct);
router.post("/addRequirements", requirement.addRequirements);
router.post("/enterNumber", vendor.enterNumber);
router.post("/addQuery", contactUs.addQuery);
router.post("/addNewProduct", addProduct.AddnewProduct);

/*=============================================================
      routers for getting data
================================================================*/
router.get("/getUsers", user.getUsers);
router.get("/getAllAdmins", admin.getAllAdmins);
router.get("/getAllAuctions", auction.getAllAuctions);
router.get("/getAllBrands", brand.getAllBrands);
router.get("/getAllBusinessProfiles", businessProfile.getAllBusinessProfile);
router.get("/getAllInACart", cart.getAllInACart);
router.get("/getAllCategory", category.getAllCategory);
router.get("/getAllOrders", order.getAllOrders);
router.get("/getAllProducts", product.getAllProducts);
router.get("/getAllRequirements", requirement.getAllRequirements);
router.get("/getQuesries", contactUs.getAllQueries);
router.get("/getAllNewProducts", addProduct.getAllTheProducts);

/*=============================================================
      routers for getting data by ID
================================================================*/
router.get("/user/:id", user.getUserById);
router.get("/admin/:id", admin.getAdminById);
router.get("/auction/:id", auction.getAuctionById);
router.get("/brand/:id", brand.getBrandByID);
router.get("/businessProfile/:id", businessProfile.getBusinessProfileByID);
router.get("/cart/:id", cart.getCartById);
router.get("/category/:id", category.getAllCategoryByID);
router.get("/order/:id", order.getOrderById);
router.get("/product/:id", product.getProductByID);
router.get("/requirement/:id", requirement.getRequirementByID);
router.get("/query/:id", contactUs.getQueryById);
router.get("/newProduct/:id", addProduct.getProductByID);

/*=============================================================
      routers for update data
================================================================*/
router.put("/updateUser/:id", user.updateUser);
router.put("/updateAdmin/:id", admin.updateAdmin);
router.put("/updateAuction/:id", auction.updateAuction);
router.put("/updateBrand/:id", brand.updateBrands);
router.put("/updateBusinessProfile/:id", businessProfile.updateBusinessProfile);
router.put("/updateCart/:id", cart.updateACart);
router.put("/updateCategory/:id", category.updateCategory);
router.put("/updateOrder/:id", order.updateOrder);
router.put("/updateProduct/:id", product.updateProduct);
router.put("/updateRequirement/:id", requirement.updateRequirements);
router.put("/updateQuery/:id", contactUs.updateAQuery);
router.put("/updateNewProduct/:id", addProduct.updateProduct);

/*=============================================================
      routers for delete data
================================================================*/
router.delete("/deleteUser/:id", user.deleteUser);
router.delete("/deleteAdmin/:id", admin.deleteAdmin);
router.delete("/deleteAuction/:id", auction.deleteAuction);
router.delete("/deleteBrand/:id", brand.deleteBrand);
router.delete(
  "/deleteBusinessProfile/:id",
  businessProfile.deleteBusinessProfile
);
router.delete("/deleteCart/:id", cart.deleteACart);
router.delete("/deleteCategory/:id", category.deleteCategory);
router.delete("/deleteOrder/:id", order.deleteOrder);
router.delete("/deleteProduct/:id", product.deleteProduct);
router.delete("/deleteRequirement/:id", requirement.deleteRequirement);
router.delete("/deleteQuery/:id", contactUs.deleteQuery);
router.delete("/deleteNewProduct/:id", addProduct.deleteAProduct);

module.exports = router;
