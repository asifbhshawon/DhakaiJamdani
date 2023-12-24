import React from "react";
import "../Popular/Popular.css";
import { useProductContext } from "../../Context/ProductContext";
import Item from "../Item/Item";

const Popular = () => {
  const { allProducts } = useProductContext();
  console.log(allProducts);
  return (
    <div className="popular">
      <h1>Popular in Sharee</h1>
      <hr />
      <div className="popular-item">
        {allProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              name={item.title}
              image={item.images[0].downloadURL}
              new_price={item.price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
