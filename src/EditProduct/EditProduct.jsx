
import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProductContext } from '../App';


const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [edit, setEdit] = useState('');

  useEffect(() => {
    // Access the value from the location object
    console.log('location', location)
    const editValue = location.state && location.state.edit;
    if (editValue) {
      setEdit(editValue);
    }
  }, [location]);
  const { products, setProducts } = useContext(ProductContext);

  const handleInputChange = (e) => {
    const { name, files, value } = e.target;
    if (name === 'images' && files && files.length > 0) {
      const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setEdit(prevProduct => ({ ...prevProduct, images: [...prevProduct.images, ...fileUrls] }));
    } else {
      setEdit(prevProduct => ({ ...prevProduct, [name]: value }));
    }
  };

  const handleSave = () => {
    // Add validation logic here before saving
    if (edit.title && edit.price) {
      setProducts((products) =>
        products.map((product) =>
          product.id === edit.id ? { ...product, ...edit } : product
        )
      );

      // Implement logic to save the updated product details
      console.log('Product updated:', edit);

      // Redirect to the Home page after saving
      navigate('/home');
    } else {
      // Display an error or alert if required fields are not filled
      console.error('Please fill in the required fields');
    }
  };

  const handleCancel = () => {
    // Redirect to the Home page when canceled
    navigate('/home');
  };

  return (

    <div >
      <img
        src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?w=740&t=st=1703309781~exp=1703310381~hmac=f4131cb7f7d5acb49ecaf9a5e80f0011ac1922f37b3330d37937dbfc2c50a461"
        alt="Logo"
        style={{ width: '80px', height: 'auto' }}
      />
      <div className="edit-product-container">
        <h1>Edit Product</h1>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" name="title" value={edit.title} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formBrand">
            <Form.Label>Brand</Form.Label>
            <Form.Control type="text" placeholder="Enter brand" name="brand" value={edit.brand} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Enter category" name="category" value={edit.category} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="text" placeholder="Enter rating" name="rating" value={edit.rating} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="Enter price" name="price" value={edit.price} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="text" placeholder="Enter stock" name="stock" value={edit.stock} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formDiscountPercentage">
            <Form.Label>Discount Percentage</Form.Label>
            <Form.Control type="text" placeholder="Enter discount percentage" name="discountPercentage" value={edit.discountPercentage} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={edit.description} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formImages">
            <Form.Label>Images</Form.Label>
            <Form.Control type="file" name="images" onChange={handleInputChange} multiple />
          </Form.Group>

          <div className="button-group">
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>

            {/* Use Link for Cancel button */}
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

export default EditProduct;