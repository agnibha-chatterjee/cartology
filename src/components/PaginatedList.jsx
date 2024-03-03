import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function PaginatedList(props) {
  const { products, itemsPerPage, renderItem } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [products, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <ul className="w-full overflow-y-scroll" style={{ height: 525 }}>
        {currentProducts.map(product => {
          return (
            <li
              key={product.key}
              className="card mb-3 flex flex-row justify-content-between px-2"
            >
              {renderItem(product)}
            </li>
          );
        })}
      </ul>
      <div className="w-full d-flex align-items-center justify-content-center my-2">
        <button
          className="btn btn-sm btn-primary mr-1"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-sm btn-primary ml-1"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

PaginatedList.propTypes = {
  products: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired
};
