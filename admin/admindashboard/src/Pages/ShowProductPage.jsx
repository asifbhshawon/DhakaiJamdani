import React, { useEffect, useState } from "react";
import { useProductContext } from "../Context/ProductContext";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

const ShowProductPage = () => {
  const { allProducts, loading } = useProductContext();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    inStock: true,
    category: "Sharee",
    price: "",
  });
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(false);
  const [prodTitle, setProdTitle] = useState();
  const [updatedImages, setUpdatedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [Loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loading) return;
    const foundProduct = allProducts.find((e) => e._id === productId);
    if (foundProduct && !status) {
      setProduct(foundProduct);
      setProdTitle(foundProduct.title);
      setStatus(true);
      const imageUrls = foundProduct.images.map((i) => i.downloadURL);
      setImages(imageUrls);
      console.log(foundProduct, images); // not showing images
    }
  }, [loading, productId, allProducts, product, status, images]);

  console.log(images);
  const handleImageChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const validImageTypes = ["image/jpeg", "image/png"];
    const invalidFiles = [];

    // Validate each selected file
    for (let i = 0; i < newFiles.length; i++) {
      const fileType = newFiles[i]["type"];

      if (validImageTypes.includes(fileType)) {
        setUpdatedImages((prevImages) => [...prevImages, newFiles[i]]);
      } else {
        invalidFiles.push(newFiles[i]);
      }
    }

    if (invalidFiles.length > 0) {
      alert("Only images (gif, jpeg, png) are accepted.");
    }
  };

  const removeImage = (name) => {
    setUpdatedImages((prevFiles) =>
      prevFiles.filter((file) => file.name !== name)
    );
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
    formData.append("inStock", product.inStock);
    formData.append("category", product.category);
    formData.append("price", product.price);

    // Append each file to the FormData object
    updatedImages.forEach((file, index) => {
      formData.append("images", file);
    });

    // formData.append("images", images[0]);
    // formData.append("images", images[1]);

    try {
      // Send the FormData object to your backend
      const res = await axios.patch(`http://localhost:8080/products/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      if (res.status === 201) {
        // setShowModal(true);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
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
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  const onClickModal = () => {
    setShowModal(!showModal);
  };

  return (
    product && (
      <>
        <Modal
          open={Loading}
          onClose={onClickModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <Box sx={style}>
            <CircularProgress />
            <Typography
              id="modal-modal-description"
              variant="h4"
              sx={{ mt: 0 }}
            >
              Loading...
            </Typography>
          </Box>
        </Modal>

        {/* <Modal
          open={showModal}
          onClose={onClickModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <Box sx={style}>
            <DoneAllRoundedIcon fontSize="large" color="success" />
            <Typography
              id="modal-modal-description"
              variant="h4"
              sx={{ mt: 0 }}
              color="green"
            >
              Product Updated
            </Typography>
          </Box>
        </Modal> */}
        {/* <CssBaseline /> */}
        <Container maxWidth="xl">
          <Box sx={{ bgcolor: "#cfe8fc", height: "auto", borderRadius: "5px" }}>
            <div className="p-10">
              <div className="flex justify-between mb-6">
                <Typography fontWeight="600" variant="h4">
                  {prodTitle}
                </Typography>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </div>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="title"
                  variant="outlined"
                  name="title"
                  focused
                  value={product.title}
                  onChange={handleInputChange}
                ></TextField>
                <div className="pt-5">
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    variant="outlined"
                    name="description"
                    focused
                    value={product.description}
                    onChange={handleInputChange}
                  ></TextField>
                </div>
                <FormControl margin="normal" variant="outlined">
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
                <span className="pl-5">
                  <TextField
                    margin="normal"
                    name="price"
                    value={product.price}
                    label="Price"
                    variant="outlined"
                    type="number"
                    required
                    onChange={handleInputChange}
                  />
                </span>
                <span className="pl-5">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Stock
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={product.inStock.toString()} // Convert boolean to string for comparison
                      onChange={(event) => {
                        const newValue = event.target.value === "true"; // Convert string to boolean
                        setProduct((prevProduct) => ({
                          ...prevProduct,
                          inStock: newValue,
                        }));
                      }}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="In Stock"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Out of Stock"
                      />
                    </RadioGroup>
                  </FormControl>
                </span>
                <FormControl
                  focused
                  fullWidth
                  margin="normal"
                  variant="outlined"
                >
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="flex justify-center gap-7 mt-2">
                      {images &&
                        images.map((file, key) => {
                          return (
                            <span
                              key={key}
                              className="overflow-hidden relative"
                            >
                              <img
                                className="h-32 w-32 rounded-md"
                                src={file}
                                alt={`${key + 1}`}
                              />
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </FormControl>
                <FormControl
                  focused
                  fullWidth
                  margin="normal"
                  variant="outlined"
                >
                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Upload more pictures of the product
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
                          />
                        </label>
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        {updatedImages.map((file, key) => {
                          return (
                            <div key={key} className="overflow-hidden relative">
                              <img
                                className="h-20 w-20 rounded-md"
                                src={URL.createObjectURL(file)}
                                alt={`${key + 1}`}
                              />
                              <DeleteForeverSharpIcon
                                className="absolute right-1 top-1 text-white hover:text-black cursor-pointer"
                                onClick={() => {
                                  removeImage(file.name);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </FormControl>
                <div className="flex justify-end">
                  <Button variant="text">Cancel</Button>
                  <Button variant="contained" type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </Box>
        </Container>
      </>
    )
  );
};

export default ShowProductPage;
