import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setAllProducts(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ProductContext.Provider value={{ allProducts, loading }}>
      {props.children}
    </ProductContext.Provider>
  );
};
