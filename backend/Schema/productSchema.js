const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  category: { type: [String], required: true },
  images: [{
    originalname: { type: [String], required: true },
    downloadUrl: { type: [String], required: true }
  }],
});

exports.Product = mongoose.model("Product", productSchema);
