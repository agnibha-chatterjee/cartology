import { useState } from 'react';

export function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

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

  const handleSubmit = event => {
    event.preventDefault();
    if (validate()) {
      console.log('Product Created:', { name, price });
      // Reset form
      setName('');
      setPrice('');
      setErrors({});
    }
  };

  return (
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
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Create Product
      </button>
    </form>
  );
}
