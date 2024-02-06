import { Item } from "../Item/Item";
import "./ItemList.css";

// Este componente muestra una lista de productos
export const ItemList = ({ products }) => {
  return (
    <div className="ItemListContainer">
      {/* Recorre el arreglo de productos y para cada uno, muestra un componente Item */}
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
};
