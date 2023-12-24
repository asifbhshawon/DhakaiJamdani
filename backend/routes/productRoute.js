const express = require("express");
const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + file.originalname;
//       cb(null, file.fieldname + '-' + unique Suffix);
//     }
//   })

const upload = multer({ storage: multer.memoryStorage() });
const productController = require("../Controller/productController");

const router = express.Router();

router
  .post("/", upload.array("images", 12), productController.addNewProduct)
  .get("/", productController.getAllproducts);

exports.router = router;
