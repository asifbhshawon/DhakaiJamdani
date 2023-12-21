import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo-1.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const { getTotalItems } = useContext(ShopContext);
  // console.log(getTotalItems());
  const [menu, setMenu] = useState("shop");
  return (
    <div className="navBar">
      <div className="nav-logo">
        <img src={logo} alt="" className="logo" />
        <p className="logo-title">ঢাকাইয়া জামদানি</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none", color: "#626262" }} to="/">
            Shop
          </Link>{" "}
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("sharee");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "#626262" }}
            to="/sharee"
          >
            Sharee
          </Link>{" "}
          {menu === "sharee" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("threepcs");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "#626262" }}
            to="/threepcs"
          >
            Three Pieces
          </Link>{" "}
          {menu === "threepcs" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("contact");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "#626262" }}
            to="/contact"
          >
            Contact
          </Link>{" "}
          {menu === "contact" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link style={{ textDecoration: "none", color: "#626262" }} to="/login">
          <button>Login</button>
        </Link>
        <Link style={{ textDecoration: "none", color: "#626262" }} to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-cout">{getTotalItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
