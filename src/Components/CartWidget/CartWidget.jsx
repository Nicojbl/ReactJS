import { useContext } from "react";

import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

import { AiOutlineShoppingCart } from "react-icons/ai";
import "./CartWidget.css";

// Este componente muestra un icono de carrito y la cantidad de productos agregados al carrito
export const CartWidget = () => {
  // Obtiene el arreglo de productos agregados al carrito del contexto
  const { productsAdded } = useContext(CartContext);
  // Obtiene la cantidad de productos agregados al carrito
  const count = productsAdded.length;

  return (
    <div className="cartContainer">
      <Link to="/cart">
        <AiOutlineShoppingCart className="cart" />
        {/* Si hay productos agregados al carrito, mostramos la cantidad */}
        {count > 0 && <span className="quantityCart">{count}</span>}
      </Link>
    </div>
  );
};
