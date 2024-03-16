import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ProductContext } from '../App'; // Update the path accordingly

const AddProduct = () => {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    title: '',
    brand: '',
    category: '',
    rating: '',
    price: '',
    stock: '',
    discountPercentage: '',
    description: '',
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'images' ? [...prevProduct[name], ...files] : value,
    }));
  };

  const handleCancel = () => {
    // Redirect to the home page
    navigate('/home');
  };

  const addNewProduct = (e) => {
    e.preventDefault();
    const newTableData = [...products, newProduct];
    setProducts(newTableData);
    toast.success('Product Added Successfully');
    navigate('/home');
  };
console.log(products);

  return (
    <div >       
       <img
              src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?w=740&t=st=1703309781~exp=1703310381~hmac=f4131cb7f7d5acb49ecaf9a5e80f0011ac1922f37b3330d37937dbfc2c50a461"
              alt="Logo"
              style={{ width: '80px', height: 'auto' }}
            />
    <div className="add-product-container">
    <h1>Create New Product</h1>
    <Form onSubmit={addNewProduct}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" name="title" value={newProduct.title} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group controlId="formBrand">
        <Form.Label>Brand</Form.Label>
        <Form.Control type="text" placeholder="Enter brand" name="brand" value={newProduct.brand} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Enter category" name="category" value={newProduct.category} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formRating">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="text" placeholder="Enter rating" name="rating" value={newProduct.rating} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Enter price" name="price" value={newProduct.price} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formStock">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="text" placeholder="Enter stock" name="stock" value={newProduct.stock} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formDiscountPercentage">
        <Form.Label>Discount Percentage</Form.Label>
        <Form.Control type="text" placeholder="Enter discount percentage" name="discountPercentage" value={newProduct.discountPercentage} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={newProduct.description} onChange={handleInputChange} />
      </Form.Group>
      
      <Form.Group controlId="formImages">
          <Form.Label>Images</Form.Label>
          <Form.Control type="file" name="images" onChange={handleInputChange} multiple />
        </Form.Group>

       <div className="button-group">
            <Button variant="primary" type="submit">
              Save
            </Button>
            <ToastContainer position="top-center" autoClose={5000} />
            <Link to="/home">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Link>
          </div>
      </Form>
    </div>
    </div>
  );
};


export default AddProduct;

















//   const navigate = useNavigate();
//   const [newProduct, setNewProduct] = useState({
//     title: '',
//     brand: '',
//     category: '',
//     rating: '',
//     price: '',
//     stock: '',
//     discountPercentage: '',
//     description: '',
//     images: [], 
//   });

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     setNewProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: name === 'images' ? [...prevProduct[name], ...files] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault(); 
// toast.success("Product Added Successfully")
// setTimeout(()=>{
//   if (newProduct.title && newProduct.price) {
//     onSave(newProduct);
//     navigate('/home');
//   } 
// },1000)
    
//   };

//   const handleCancel = () => {
//     navigate('/home');
//   };
