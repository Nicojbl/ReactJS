import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetItemImg } from "../../hooks/useGetItemImg";

import { CartContext } from "../../context/cartContext";
import { ItemCount } from "../ItemCount/ItemCount";
import { Loading } from "../Loading/Loading";
import "./ItemDetail.css";

// Este componente muestra el detalle de un producto y permite agregarlo al carrito o ir al carrito
export const ItemDetail = ({ item }) => {
  /*Función para agregar un producto al carrito y la función para verificar
  si un producto está en el carrito, traidas con el context.*/
  const { addItem, isInCart } = useContext(CartContext);
  const navigate = useNavigate();
  // Estado para llevar el control de la cantidad de productos seleccionada
  const [count, setCount] = useState(1);
  // Estado para llevar el control del stock actual del producto
  const [currentStock, setCurrentStock] = useState(item.stock);
  /* Almacena la cantidad máxima de productos que se pueden seleccionar
  (igual al stock actual del producto)*/
  const maxQuantity = currentStock;
  // Obtiene la imagen del producto
  const img = useGetItemImg(item.img);

  // Función para manejar el contador de cantidad de productos
  const handleCount = (type) => {
    if (type === "plus" && count < maxQuantity) setCount(count + 1);
    if (type === "minus" && count > 1) setCount(count - 1);
  };

  // Función para agregar el producto al carrito y actualiza el stock actual
  const handleAdd = () => {
      setCurrentStock(currentStock - count);
      addItem(item, count);
  };

  // Te ubica en el cart
  const handleCheckout = () => {
    navigate("/cart");
  };

  return (
    <div className="itemContainer">
      <div>
        {/* Si aún no se ha obtenido la imagen del producto, se muestra un mensaje de carga */}
        {!img ? (
          <Loading />
        ) : (
          /* Si ya se ha obtenido la imagen, se muestra */
          <img className="itemImage" src={img} alt={item.name} />
        )}
      </div>
      <div className="itemDescription">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemDescription">{item.description}</p>
        <span className="itemPrice">
          Price: <strong className="textGray800">${item.price}</strong>
        </span>
        {/* Si hay stock del producto, mostramos la cantidad disponible */}
        {currentStock > 0 && (
          <p className="textSm itemStock">En Stock: {currentStock}</p>
        )}

        <div className="itemActions">
          {/* Si hay stock del producto, mostramos el contador para seleccionar la cantidad */}
          {currentStock > 0 ? (
            <ItemCount count={count} handleCount={handleCount} />
          ) : (
          /* Si no hay stock del producto, mostramos un mensaje de "sin stock" */
            <div className="itemOutOfStock">Sin stock</div>
          )}
          <div className="buttonContainer">
            {/* Al hacer clic en el botón "Agregar al carrito", agregamos el producto al carrito */}
            <button
              onClick={handleAdd}
              className="addToCartButton"
              disabled={currentStock === 0}
            >
              Agregar al carrito
            </button>
            {/* Al hacer clic en el botón "Finalizar Compra", vamos a la página del carrito */}
            <button
              disabled={!isInCart(item.id)}
              onClick={handleCheckout}
              className="checkoutButton"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};