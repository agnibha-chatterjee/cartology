import { useState, useEffect } from 'react';
import { myFirebase } from '../models/MyFirebase';
import PropTypes from 'prop-types';

export function Products(props) {
  const {
    itemsPerPage,
    setCart,
    setKeyOfProductComponent,
    setSelectedProduct
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagesData, setPagesData] = useState({});

  const addToCart = product => {
    setCart(pState => [
      ...pState,
      { ...product, key: product.id + Math.random() }
    ]);
  };

  const deleteProduct = async product => {
    await myFirebase.deleteProduct(product.id);
    const newProducts = products.filter(p => p.id !== product.id);
    setProducts(newProducts);
    setPagesData({ ...pagesData, [currentPage]: newProducts });
    setKeyOfProductComponent(Math.random());
  };

  const updateProduct = async product => {
    setSelectedProduct(product);
  };

  const fetchProducts = async pageCount => {
    setLoading(true);
    const { newProducts, lastVisibleDoc } =
      await myFirebase.getProductsWithinLimits(lastVisible, itemsPerPage);

    setLastVisible(lastVisibleDoc);
    setPagesData({ ...pagesData, [pageCount]: newProducts });
    setProducts(newProducts);
    setLoading(false);
  };

  useEffect(() => {
    const fetchTotalProducts = async () => {
      const count = await myFirebase.getTotalCountOfProducts();
      setTotalProducts(count);
    };

    fetchTotalProducts();
    fetchProducts(currentPage);
  }, []);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    if (pagesData[currentPage + 1]) {
      setProducts(pagesData[currentPage + 1]);
      return;
    }
    fetchProducts(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setProducts(pagesData[currentPage - 1]);
    }
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!totalProducts) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <div className="fw-bold fs-4">Products ({totalProducts} in total)</div>
      <div className="w-full overflow-y-scroll" style={{ height: 550 }}>
        {products.map(product => (
          <div key={product.id} className="card my-2">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">Price: ${product.price}</p>
              <div>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => updateProduct(product)}
                >
                  Update Product
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => deleteProduct(product)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full d-flex align-items-center justify-content-center my-4">
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

Products.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  setCart: PropTypes.func.isRequired,
  setKeyOfProductComponent: PropTypes.func.isRequired,
  setSelectedProduct: PropTypes.func.isRequired
};
