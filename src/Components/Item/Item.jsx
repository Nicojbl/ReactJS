import { useNavigate } from "react-router-dom";
import { useGetItemImg } from "../../hooks/useGetItemImg";

import { Loading } from "../Loading/Loading";
import "./Item.css";

// Este componente muestra un producto con su imagen, nombre, precio y cantidad agregada al carrito
export const Item = ({ product, quantityAdded }) => {
  // Obtiene el hook de navegación de React
  const navigate = useNavigate();
  // Obtiene la imagen del producto
  const img = useGetItemImg(product.img);

  // Función para navegar al detalle del producto
  function handleNavigate() {
    navigate(`/item/${product.id}`);
  }

  // Si aún no se ha obtenido la imagen del producto, muestra un mensaje de carga
  if (!img) {
    return <Loading />;
  }

  return (
    <div onClick={handleNavigate} className="items">
      <div>
        <img src={img} className="itemImg" alt="Product" />
        <p className="itemName">{product.name}</p>
      </div>
      <hr />
      <div>
        <span className="ItemPrice">${product.price}</span>
        <span>{quantityAdded}</span>
      </div>
    </div>
  );
};
