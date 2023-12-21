import { useState } from "react";
import "./CSS/AddProduct.css";
import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:8080';

// import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Example() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
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
    
    // formData.append("images", images[0]);
    // formData.append("images", images[1]);

    try {
      // Send the FormData object to your backend
      const res = await axios.post("http://localhost:8080/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });
      console.log(res.status);
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
      category: "Sharee",
      price: "",
      images: [],
    }));
    images.forEach((file) => {
      removeImage(file.name);
    });
  };

  return (
    <div className="bodyContain">
      <h2 className="text-center font-extrabold leading-10 text-black">
        Add a product
      </h2>
      <form onSubmit={handleSubmit} className="max-w-screen-md mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={product.title}
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="khaki jamdani"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={product.description}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a description for the product.
                </p>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="Category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="Category"
                    name="Category"
                    autoComplete="Category"
                    value={product.category}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                  >
                    <option>Sharee</option>
                    <option>Panjabi</option>
                    <option>ThreePcs</option>
                  </select>
                </div>
              </div>
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
                          Select a photo
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
                  <div className="flex flex-wrap gap-2 mt-2">
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
            </div>
            <br />
            <div className="col-span-full">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.price}
                  autoComplete="price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
