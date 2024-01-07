import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import AddProductForm from "./Pages/AddProduct";
import Products from "./Pages/Products";
import ShowProductPage from "./Pages/ShowProductPage";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element = {<AddProductForm />} />
        <Route path="/products" element = {<Products />} />
        <Route path="/product" element = {<ShowProductPage />}> 
          <Route path=":productId" element = {<ShowProductPage />}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
