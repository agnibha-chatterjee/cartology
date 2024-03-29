import { useState } from "react";
import { CreateProduct } from "./components/CreateProduct";
import { Jumbotron } from "./components/Jumbotron";
import { Products } from "./components/Products";
import { ShoppingCart } from "./components/ShoppingCart";
import { useEffect } from "react";

function App() {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [keyOfProductComponent, setKeyOfProductComponent] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [cart, setCart] = useState(existingCart);

  const persistToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const deleteFromLocalStorage = () => {
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    if (cart.length > 0) {
      persistToLocalStorage();
    } else {
      deleteFromLocalStorage();
    }
  }, [cart]);

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
            itemsPerPage={20}
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
