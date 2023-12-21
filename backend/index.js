require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const path = require('path');
const productRouter = require('./routes/productRoute');

const server = express();
const bodyParser = require('body-parser');
const app = express();
server.use(express.urlencoded({extended: false}));

try {
  main();
} catch (err) {
  console.log("error connecting");
}

async function main() {
    const db = await mongoose.connect(process.env.MONGO_URL);
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    console.log("database connected");
}


server.use(cors());
server.use(express.json())
server.use('/products', productRouter.router);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});