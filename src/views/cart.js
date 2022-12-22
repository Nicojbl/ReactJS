import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Item } from "../Components/Item/Item";
import { Layout } from "../Components/Layout/Layout";
import { TrashWidget } from "../Components/TrashWidget/TrashWidget";
import { CartContext } from "../context/cartContext";
import "./cart.css";

const CartView = () => {
  const navigate = useNavigate();
  const { productsAdded: items, totalAmount } = useContext(CartContext);

  // Navega al checkout
  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Layout>
      <div className="cartContainer">
        {/* Si no hay productos en el carrito, se muestra un mensaje
        de carrito vacío y un botón para ir al inicio */}
        {items.length === 0 ? (
          <div className="emptyCartMessage">
            <h1>No has agregado productos</h1>
            <button
              onClick={() => navigate("/")}
            >
              Ir al Inicio
            </button>
          </div>
        ) : (
          /* Si hay productos en el carrito, mostramos la lista de productos y el total a pagar */
          <div>
            <div className="cartList">
              {items.map((product) => {
                const quantityAdded = product.quantityAdded;

                return (
                  <div className="cartListItem">
                    <Item product={product.item} />
                    {/* Se muestra la cantidad de productos agregados y el botón para eliminar el producto del carrito */}
                    <div className="quantityAddedContainer">
                      <span className="quantityAdded">Cantidad: {quantityAdded}</span>
                      <TrashWidget itemId={product.item.id} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="checkoutContainer">
              {/* Mostra el total a pagar */}
              <span>
                Total a pagar: <strong>${totalAmount}</strong>
              </span>
              {/* Boton para ir al checkout */}
              <button
                onClick={goToCheckout}
              >
                Ir al Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartView;
