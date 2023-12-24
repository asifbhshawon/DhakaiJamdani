import React, { createContext, useEffect, useState } from "react";
// import all_product from "../Components/Assets/all_product";
import { useProductContext } from "./ProductContext";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const { allProducts, loading } = useProductContext();
  // console.log(all_product, 'ShopContext')
  const [cartItems, setCartItems] = useState(getDefaultCart(allProducts));

  // Wait until data is loaded before initializing the cart
  useEffect(() => {
    console.log(allProducts, "ShopContext");
    if (!loading) {
      setCartItems(getDefaultCart(allProducts));
    }
  }, [loading, allProducts]);
  //   console.log(cartItems)

  const addToCart = (itemId) => {
    console.log(itemId);
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmmount = 0;
    for (const item in cartItems) {
      // console.log(item)
      if (cartItems[item] > 0) {
        let itemInfo = allProducts.find(
          (product) => product._id === (item)
        );
        // console.log(itemInfo)
        totalAmmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmmount;
  };

  const getTotalItems = () => {
    let count = 0;
    for (const item in cartItems) {
      count += cartItems[item];
    }
    return count;
  };

  const contextValue = {
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

const getDefaultCart = (allProducts) => {
  let cart = {};
  allProducts.forEach((product) => {
    cart[product._id] = 0;
  });
  return cart;
};

export default ShopContextProvider;
