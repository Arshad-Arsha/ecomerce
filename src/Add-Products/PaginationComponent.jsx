// PaginationComponent.jsx
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
  );
};


export default PaginationComponent;
