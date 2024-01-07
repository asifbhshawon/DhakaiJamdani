import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from '@mui/material/CircularProgress';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';

import axios from "axios";

import "./CSS/AddProduct.css";
import Box from "@mui/material/Box";

const AddProductForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const onClickModal = () => {
    setShowModal(!showModal);
  };
  const [product, setProduct] = useState({
    title: "",
    description: "",
    inStock: true,
    category: "Sharee",
    price: "",
  });
  const [images, setImages] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const validImageTypes = ["image/jpeg", "image/png"];
    const invalidFiles = [];

    // Validate each selected file
    for (let i = 0; i < newFiles.length; i++) {
      const fileType = newFiles[i]["type"];

      if (validImageTypes.includes(fileType)) {
        setImages((prevImages) => [...prevImages, newFiles[i]]);
      } else {
        invalidFiles.push(newFiles[i]);
      }
    }

    if (invalidFiles.length > 0) {
      alert("Only images (gif, jpeg, png) are accepted.");
    }
  };

  const removeImage = (name) => {
    setImages((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Now 'product' state contains all input values
    // console.log(product);

    // now send the product object to your backend and store it in MongoDB

    // Create a new FormData object
    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);

    // Append each file to the FormData object
    images.forEach((file, index) => {
      formData.append("images", file);
    });

    formData.append("images", images[0]);
    formData.append("images", images[1]);

    try {
      // Send the FormData object to your backend
      const res = await axios.post("http://localhost:8080/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });
      if (res.status === 201) {
        setShowModal(true);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Clear the input fields after submitting
    setProduct((prevProduct) => ({
      // ...prevProduct,
      title: "",
      description: "",
      inStock: true,
      category: "Sharee",
      price: "",
      images: [],
    }));
    images.forEach((file) => {
      removeImage(file.name);
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper", 
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display:"flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  };

  return (
    <>
      <Modal
        open={loading}
        onClose={onClickModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Box sx={style}>
          <CircularProgress/>
          <Typography id="modal-modal-description" variant='h4' sx={{ mt: 0 }}>
            Loading...
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={showModal}
        onClose={onClickModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Box sx={style}>
          <DoneAllRoundedIcon fontSize="large" color="success"/>
          <Typography id="modal-modal-description" variant='h4' sx={{ mt: 0 }} color='green'>
            Product Added
          </Typography>
        </Box>
      </Modal>

      <div
        className="container"
        style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}
      >
        <Typography variant="h5" gutterBottom>
          Add a Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={product.title}
            variant="outlined"
            required
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            name="description"
            value={product.description}
            margin="normal"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            required
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            margin="normal"
            name="price"
            value={product.price}
            label="Price"
            variant="outlined"
            type="number"
            required
            onChange={handleInputChange}
          />

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              label="Category"
              required
              value={product.category}
              onChange={handleInputChange}
            >
              <MenuItem value="Sharee">Sharee</MenuItem>
              <MenuItem value="Panjabi">Panjabi</MenuItem>
              <MenuItem value="Three Pcs">ThreePcs</MenuItem>
            </Select>
          </FormControl>

          <FormControl focused fullWidth margin="normal" variant="outlined">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload pictures of the product
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="flex items-center justify-center w-full">
                  <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Select photos
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="opacity-0"
                      // value={product.images}
                      multiple="multiple"
                      name="files"
                      required
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {images.map((file, key) => {
                    return (
                      <div key={key} className="overflow-hidden relative">
                        <i
                          onClick={() => {
                            removeImage(file.name);
                          }}
                          className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                        ></i>
                        <img
                          className="h-20 w-20 rounded-md"
                          src={URL.createObjectURL(file)}
                          alt={`${key + 1}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            // fullWidth
            style={{ marginTop: "20px", marginLeft: "350px" }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddProductForm;
