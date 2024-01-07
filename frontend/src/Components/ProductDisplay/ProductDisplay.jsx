import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.images[0].downloadURL} alt="" />
          <img src={product.images[1].downloadURL} alt="" />
          <img src={product.images[2].downloadURL} alt="" />
          <img src={product.images[0].downloadURL} alt="" />
        </div>
        <div className="productdisplay-main-img">
          <img src={product.images[0].downloadURL} alt="" className="productdisplay-main-img" />
        </div>
        <div className="productdisplay-right">
          <h1>{product.title}</h1>
          <div className="productdisplay-rigth-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
              ${product.old_price}
            </div>
            <div className="productdisplay-right-price-new">
              ${product.price}
            </div>
          </div>
          <div className="productdisplay-right-description">
            {product.description}
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>XXL</div>
            </div>
            <button onClick={()=>{addToCart(product._id)}}>ADD TO CART</button>
            <p className="productdisplay-right-category">
              <span>Category :</span>Women, Sharee
            </p>
            <p className="productdisplay-right-category">
              <span>Tags :</span>Jamdani, Latest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
