import { useState } from 'react';
import { CreateProduct } from './components/CreateProduct';
import { Jumbotron } from './components/Jumbotron';
import { Products } from './components/Products';
import { ShoppingCart } from './components/ShoppingCart';

function App() {
  const [keyOfProductComponent, setKeyOfProductComponent] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [cart, setCart] = useState([]);

  return (
    <div>
      <div className="container">
        <Jumbotron />
      </div>
      <div className="row mx-2">
        <div className="col-md-4">
          <CreateProduct
            selectedProduct={selectedProduct}
            setKeyOfProductComponent={setKeyOfProductComponent}
          />
        </div>
        <div className="col-md-4">
          <Products
            itemsPerPage={3}
            key={keyOfProductComponent}
            setCart={setCart}
            setKeyOfProductComponent={setKeyOfProductComponent}
            setSelectedProduct={setSelectedProduct}
          />
        </div>
        <div className="col-md-4">
          <ShoppingCart cart={cart} setCart={setCart} />
        </div>
      </div>
    </div>
  );
}

export default App;
