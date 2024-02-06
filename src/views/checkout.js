import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout } from "../Components/Layout/Layout";
import { CartContext } from "../context/cartContext";
import Swal from 'sweetalert';
import "./checkout.css";

import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const CheckoutView = () => {
  // Estado para controlar el estado de carga
  const [isLoading, setIsLoading] = useState(false);
  // Estado para controlar si se están actualizando los productos
  const [updatingProducts, setUpdatingProducts] = useState(false);
  // Contexto del carrito de compras
  const { productsAdded: items, clear, totalAmount } = useContext(CartContext);
  // Hook para navegar entre pages
  const navigate = useNavigate();

  // Función para calcular el total de un producto
  const getTotalByProduct = (quantity, price) => {
    return quantity * price;
  };

  const handleFinalizePurchase = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const phone = event.target[1].value;
    const email = event.target[2].value;

    // Valida campos del formulario
    if (!name || !email || !phone) {
      return Swal({
        title: 'Error',
        text: 'Por favor, rellena todos los campos del formulario',
        icon: 'error'
      });
    }

    if (!/^[0-9]+/.test(phone)) {
      return Swal({
        title: 'Error',
        text: 'El número de teléfono no es válido',
        icon: 'error'
      });
    }


    // Establece el estado de carga como verdadero
    setIsLoading(true);

    // Calcula el total de la compra
    const total = items
      .map((product) =>
        getTotalByProduct(product.quantityAdded, product.item.price)
      )
      .reduce((previousValue, currentValue) => previousValue + currentValue);

    // Crea el objeto de la orden
    const order = {
      buyer: { name, phone, email },
      items,
      total,
    };
    // Obtiene la instancia de Firestore
    const db = getFirestore();
    // Obtiene la colección de órdenes
    const ordersCollection = collection(db, "orders");

    try {
      // Agrega la orden a la colección
      await addDoc(ordersCollection, order);
      // Establece el estado de actualización de productos como verdadero
      setUpdatingProducts(true);
    } catch (err) {
      console.error(err);
      Swal({
        title: 'Error',
        text: 'Error al enviar la orden',
        icon: 'error'
      });
    } finally {
      // Establecer el estado de carga como falso
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (updatingProducts) {
      const db = getFirestore();

      // Itera por cada producto en el carrito
      items.forEach(async (element) => {
        // Obtiene la referencia del documento del producto
        const itemRef = doc(db, "items", element.item.id);
        // Crea el objeto con los datos a actualizar
        const dataToUpdate = {
          stock: element.item.stock - element.quantityAdded,
        };
        try {
          // Actualiza el documento del producto
          await updateDoc(itemRef, dataToUpdate);
        } catch (err) {
          console.error(err);
          Swal({
            title: 'Error',
            text: 'Error al actualizar el stock de los productos',
            icon: 'error'
          });
        }
      });
      // Limpia el form
      clear();
      Swal({
        title: '¡Éxito!',
        text: '¡La compra se ha realizado!',
        icon: 'success'
      });
      // Navegar a la página principal
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatingProducts]);

  return (
    <Layout>
      {/* Este es el formulario para finalizar la compra */}
      <form onSubmit={handleFinalizePurchase} className="formContainer">
        <div className="inputGroup">
          <input type="text" placeholder="Nombre Completo" required />
          <input type="number" placeholder="Numero de Telefono" required />
          <input type="email" placeholder="Email" required />
        </div>
        {/* Mostra el total a pagar */}
        <span className="totalAmount">
          Total a pagar: <strong>${totalAmount}</strong>
        </span>
        {/* Este es el botón para finalizar la compra */}
        <button type="submit" className="finalizeButton" disabled={isLoading}>Finalizar</button>
      </form>
    </Layout>
  );
};

export default CheckoutView;
