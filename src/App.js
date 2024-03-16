import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Home from './Home/Home.jsx';
import axios from 'axios';
import './Style.css';
import AddProduct from './Add-Products/Addproducts.jsx';
import EditProduct from './EditProduct/EditProduct.jsx';

const ProductContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((response) => {
      setProducts(response.data.products);
    })
  }, []);

  return (
    <div className="App">
    {/* Pass the products and set products to context to update and retrieve products  */}
      <ProductContext.Provider value={{ products, setProducts }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/home" element={<Home products={products} />} />
            <Route path="/edit-product" element={<EditProduct />} />
          </Routes>
        </BrowserRouter>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
export { ProductContext };
