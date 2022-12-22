import { useGetItem } from "../../hooks/useGetItem";

import { ItemDetail } from "../ItemDetail/ItemDetail";
import { Loading } from "../Loading/Loading";
import "./ItemDetailContainer.css";

export const ItemDetailContainer = () => {
  // Obtiene el producto
  const item = useGetItem();

  // Si aún no se ha obtenidoe el producto, se muestra un mensaje de carga
  if (!item) {
    return <Loading />;
  }

  return (
    <div className="ItemDetailContainer">
      <ItemDetail item={item} />
    </div>
  );
};
