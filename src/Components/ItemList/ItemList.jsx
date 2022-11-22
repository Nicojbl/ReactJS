import { Item } from "../Item/Item";

export const ItemList = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <Item product={product} />
      ))}
    </div>
  );
};
