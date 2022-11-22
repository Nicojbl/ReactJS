import { useNavigate } from "react-router-dom";

export const Item = ({ product }) => {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/item/${product.id}`);
  }

    return (
      <div>
        <img src={product.img} alt="Product" />
        <div>{product.name}</div>
        <div>{product.price}</div>
        <button onClick={handleNavigate}>Ver detalles</button>
      </div>
    );
  };
