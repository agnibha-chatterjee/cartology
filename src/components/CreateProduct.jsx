import { useState, useEffect } from 'react';
import { myFirebase } from '../models/MyFirebase';
import PropTypes from 'prop-types';

export function CreateProduct(props) {
  const { setKeyOfProductComponent, selectedProduct = {} } = props;
  const [name, setName] = useState(selectedProduct.name ?? '');
  const [price, setPrice] = useState(selectedProduct.price ?? '');
  const [errors, setErrors] = useState({});

  const isUpdate = Object.keys(selectedProduct).length > 0;

  useEffect(() => {
    setName(selectedProduct.name ?? '');
    setPrice(selectedProduct.price ?? '');
  }, [selectedProduct]);

  const validate = () => {
    let isValid = true;
    const errors = {};

    if (!name) {
      isValid = false;
      errors.name = 'Name is required';
    }

    if (!price) {
      isValid = false;
      errors.price = 'Price is required';
    } else if (isNaN(price)) {
      isValid = false;
      errors.price = 'Price must be a number';
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    let product;

    if (isUpdate) {
      product = await myFirebase.updateProduct(selectedProduct.id, {
        name,
        price: parseFloat(price)
      });
    } else {
      product = await myFirebase.addProduct({
        name,
        price: parseFloat(price),
        createdAt: new Date()
      });
    }

    if (Object.keys(product).length > 0) {
      setKeyOfProductComponent(Math.random());
    }

    setName('');
    setPrice('');
    setErrors({});
  };

  return (
    <div>
      <div className="fw-bold fs-4">
        {isUpdate ? 'Update' : 'Create'} Product
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="text"
            id="price"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          {isUpdate ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}

CreateProduct.propTypes = {
  setKeyOfProductComponent: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object.isRequired
};
