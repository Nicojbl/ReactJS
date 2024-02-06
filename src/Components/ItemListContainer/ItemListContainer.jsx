import { useGetItem } from "../../hooks/useGetItem";

import { ItemList } from "../ItemList/ItemList";
import { Loading } from "../Loading/Loading";

export const ItemListContainer = () => {
  // Obtiene la lista de productos
  const items = useGetItem();
  
  // Si aún no se han obtenido los productos, se muestra un mensaje de carga
  if (!items) {
    return <Loading />;
  }

  return (
    <div>
      <ItemList products={items} />
    </div>
  );
};
