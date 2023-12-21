# DhakaiJamdani

Here we uploaded our images to firebase perfectly but one error is that we couldn't take the `DownloadUrl` in our backend

// Important 
```
const express = require("express");
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + file.originalname;
//       cb(null, file.fieldname + '-' + uniqueSuffix);
//     }
//   })

const upload = multer({storage: multer.memoryStorage()});
const productController = require("../Controller/productController");

const router = express.Router();

router.post("/",upload.array("images", 12),productController.addNewProduct);

exports.router = router;
```
here `upload` is so important that when i changed it, firebase works perfectly.
