
import React, { useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FaTrash, FaEdit, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { Modal, Button, Navbar, Container } from 'react-bootstrap';
import PaginationComponent from '../Add-Products/PaginationComponent';
import { ProductContext } from '../App';


const Home = () => {
  const navigate=useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const {products, setProducts} = useContext(ProductContext)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProduct, setdeleteProduct] = useState([]);
  
 console.log(products);

  const handleDelete = (id) => {
    setdeleteProduct(id);
    setShowDeleteModal(true); 
    console.log(deleteProduct)
  };

  const handleDeleteproduct = () => {
    setProducts((prevproducts) => {
      const totalProduct = [...prevproducts];
      return totalProduct.filter(product => product.id !== deleteProduct); 
    });
    setShowDeleteModal(false);
  };

  const handleInfo = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const getSelected = (product) => {

    setSelectedProduct(product);
    navigate('/edit-product', { state: { edit: product } })
    // Use the navigate hook to navigate to the "/edit-product" route with state object carrying selected product
  };
  console.log(products);


  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <Navbar variant="dark" style={{ position: 'sticky', top: '0', zIndex: '100', backgroundColor: 'white' }}>
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://www.freepik.com/free-vector/bird-colorful-logo-gradient-vector_28267842.htm#fromView=search&page=1&position=15&uuid=0ffed08f-2b4a-49ce-9b73-69b6f019300a"
              alt="Logo"
              style={{ width: '80px', height: 'auto' }}
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Product List Header */}
      <div style={{ position: 'sticky', top: '0', zIndex: '99', background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)', color: 'white' }}>
        <h1 style={{ textAlign: 'center', margin: '0', padding: '1rem 0' }}>PRODUCT LIST</h1>
      </div>

      {/* Product List Table */}
      <div style={{ flex: '1', overflow: 'auto', background: 'linear-gradient(to bottom, #141e30, #243b55)', color: 'white' }}>
        <div style={{ margin: '3rem', overflowX: 'auto', marginBottom: '5px' }}>
          <Table striped bordered hover className='mx-auto' style={{ background: 'rgba(255, 255, 255, 0.8)', marginBottom: '0' }}>
            {/* Table Header */}
            <thead style={{ background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)', color: 'white', position: 'sticky', zIndex: '98' }}>
              <tr style={{ textAlign: 'center' }}>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Discount Percentage</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr> 
            </thead>
            {/* Table Body */}
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={index} style={{ textAlign: 'center' }}>
                  <td>{product.title}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.rating}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.discountPercentage}</td>
                  <td>{product.description}</td>
                  <td><img src={product.images[0]} alt={product.title} style={{ width: '100px', height: '50px' }} /></td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}> 
                             
                      <button onClick={() => handleDelete(product.id)}><FaTrash /></button>
                      <button   style={{ }} variant="link" onClick={() => getSelected(product)}><FaEdit /></button>
                      <button onClick={() => handleInfo(product)}><FaInfoCircle /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Pagination */}
          <div style={{ margin: '1rem', display: 'flex', justifyContent: 'center' }}>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
          {/* Create Product Button */}
          <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
            <Link to="/add-product" style={{ textDecoration: 'none' }}>
              <Button variant="dark">
                <FaPlus /> Create Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
{/* Delete Modal */}
  <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
    <Modal.Body>Do You Want to Proceed?????</Modal.Body>
    <Modal.Footer>   
      <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Close</Button>         
      <Button variant="primary" onClick={handleDeleteproduct}>Delete</Button>
    </Modal.Footer>
  </Modal>

      {/* Product Info Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <h4>{selectedProduct.title}</h4>
              <p><strong>Brand:</strong> {selectedProduct.brand}</p>
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Rating:</strong> {selectedProduct.rating}</p>
              <p><strong>Price:</strong> {selectedProduct.price}</p>
              <p><strong>Stock:</strong> {selectedProduct.stock}</p>
              <p><strong>Discount Percentage:</strong> {selectedProduct.discountPercentage}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              {/* Add more details based on your product structure */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;


