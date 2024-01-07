import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Shop from "./Pgaes/shop";
import ShopCategory from "./Pgaes/shopCategory";
import Contact from "./Pgaes/Contact";
import Product from "./Pgaes/product";
import Cart from "./Pgaes/cart";
import Login from "./Pgaes/Login";
import Footer from "./Components/Footer/Footer";
import sharee_banner from './Components/Assets/sharee_banner.png'
import threepcs_banner from './Components/Assets/threepcs_banner.png'
// import { AuthProvider } from "./Context/AuthContext";
import Signup from "./Pgaes/Signup";
import AddProduct from './Pgaes/AddProduct';
// import kid_banner from './Components/Assets/banner_kids.png'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/sharee" element={<ShopCategory banner={sharee_banner} category="Sharee" />} />
          <Route
            path="/threepcs"
            element={<ShopCategory banner={threepcs_banner} category="threepcs" />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path='/addproduct' element={<AddProduct/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
