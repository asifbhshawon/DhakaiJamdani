import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  

//   console.log(cartItems)

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () =>{
    let totalAmmount = 0;
    for(const item in cartItems){
      // console.log(item)
      if(cartItems[item] > 0){
        let itemInfo = all_product.find((product)=>product.id === Number(item))
        // console.log(itemInfo)
        totalAmmount += itemInfo.new_price * cartItems[item]
      }
    }
    return totalAmmount;
  }

  const getTotalItems = () => {
    let count = 0;
    for (const item in cartItems) {
      count += cartItems[item];
    }
    return count;
  };

  const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalItems };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
