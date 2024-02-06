import { createContext, useState } from "react";

export const CartContext = createContext([]);

/* Contexto de compras que luego podrá ser utilizado en
cualquier parte de la aplicación para agregar, eliminar o verificar
si un producto está en el carrito.*/

export const CartContextProvider = ({ children }) => {
  // Estado para almacenar los productos que se hayan agregado al carrito
  const [productsAdded, setProductsAdded] = useState([]);
  // Estado para almacenar el monto total de los productos en el carrito
  const [totalAmount, setTotalAmount] = useState(0);

  // función para agregar un producto al carrito
  const addItem = (item, quantity) => {
    // Verifica si el producto ya está en el carrito
    const isAlreadyAdded = isInCart(item.id);
    if (isAlreadyAdded) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      setProductsAdded((prevState) =>
        prevState.map((productAdded) =>
          productAdded.item.id === item.id
            ? {
                ...productAdded,
                quantityAdded: productAdded.quantityAdded + quantity,
              }
            : productAdded
        )
      );
    } else {
      // Si el producto no está en el carrito, lo agrega
      setProductsAdded((prevState) => [
        ...prevState,
        { item, quantityAdded: quantity },
      ]);
    }

    // Actualiza el monto total
    setTotalAmount(
      (prevAmount) => prevAmount + quantity * parseInt(item.price)
    );
  };

  // función para eliminar un producto del carrito
  const removeItem = (itemId) => {
    // Busca el producto que queremos eliminar
    const itemToRemove = productsAdded.find(
      (product) => product.item.id === itemId
    );
    // Obtiene su índice en el arreglo de productos agregados
    const index = productsAdded.indexOf(itemToRemove);
    // Elimina el producto del arreglo
    productsAdded.splice(index, 1);

    // Actualiza el monto total
    setTotalAmount(
      (prevAmount) =>
        prevAmount -
        itemToRemove.quantityAdded * parseInt(itemToRemove.item.price)
    );
  };

  // Función para vaciar el carrito
  const clear = () => {
    setProductsAdded([]);
    setTotalAmount(0);
  };

  // Función para verificar si un producto está en el carrito
  const isInCart = (itemId) => {
    return Boolean(productsAdded.find((product) => product.item.id === itemId));
  };

  // Devuelve el contexto con los valores que queramos proveer
  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        clear,
        isInCart,
        productsAdded,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
