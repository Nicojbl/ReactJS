import "./ItemCount.css";

// Este componente muestra un contador para seleccionar la cantidad de un producto
export const ItemCount = ({ count, handleCount }) => {
  return (
    <div className="itemCount">
      {/* Al hacer clic en el botón de menos, disminuimos la cantidad seleccionada en 1 */}
      <button className="countButton" onClick={() => handleCount("minus")}>
        -
      </button>
      {/* Mostramos la cantidad seleccionada */}
      <span className="countInput">
        {count}
      </span>
      {/* Al hacer clic en el botón de más, aumentamos la cantidad seleccionada en 1 */}
      <button className="countButton" onClick={() => handleCount("plus")}>
        +
      </button>
    </div>
  );
};
