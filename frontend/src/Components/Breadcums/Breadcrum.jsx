// import React from "react";
// import "./Breadcrum.css";
// import arro_icon from "../Assets/breadcrum_arrow.png";

// const Breadcrum = (props) => {
//   const { product } = props;
//   return (
//     <div className="breadcrum">
//       HOME <img src={arro_icon} alt="" /> SHOP <img src={arro_icon} alt="" />{" "}
//       {product.category} <img src={arro_icon} alt="" /> {product.name}
//     </div>
//   );
// };

// export default Breadcrum;

import React from "react";
import "./Breadcrum.css";
import arro_icon from "../Assets/breadcrum_arrow.png";

const Breadcrum = (props) => {
  const { product } = props;
  console.log(product);
  return (
    <div className="breadcrum">
      HOME <img src={arro_icon} alt="" /> SHOP <img src={arro_icon} alt="" />{" "}
      {product.category} <img src={arro_icon} alt="" /> {product.title}
    </div>
  );
};

export default Breadcrum;
