import { PaginatedList } from './PaginatedList';
import PropTypes from 'prop-types';

export function ShoppingCart(props) {
  const { cart, setCart } = props;

  const totalPrice = cart.reduce(
    (acc, product) => acc + parseInt(product.price),
    0
  );

  const removeFromCart = pKey => {
    setCart(prevCart => prevCart.filter(p => p.key !== pKey));
  };

  return (
    <div>
      <div className="fw-bold fs-4">
        Shopping Cart (Total Price: ${totalPrice})
      </div>
      <div>
        {cart.length > 0 ? (
          <PaginatedList
            products={cart}
            itemsPerPage={20}
            renderItem={product => {
              return (
                <>
                  <div>{product.name}</div>
                  <div>${product.price}</div>
                  <div
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeFromCart(product.key)}
                  >
                    &times;
                  </div>
                </>
              );
            }}
          />
        ) : (
          <h5 className="mt-2">No items in the cart</h5>
        )}
      </div>
    </div>
  );
}

ShoppingCart.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired
};
