import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

// Función de custom hook que permite recuperar la URL de una imagen de Cloud Storage
export const useGetItemImg = (productImg) => {
  const [img, setImg] = useState(null);
  // Acceso a la instancia de Cloud Storage
  const storage = getStorage();
  // Referencia a la imagen en Cloud Storage
  const productImgRef = ref(storage, productImg);

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const data = await getDownloadURL(productImgRef);
        setImg(data);
      } catch (error) {
        console.error("Error al obtener la URL de la imagen:", error);
        // Puedes manejar el error de otra manera aquí, por ejemplo, lanzar una excepción
      }
    };

    fetchImageURL();

    // Limpiar el efecto si es necesario
    // return () => {
    //   // Código de limpieza
    // };
  }, [productImgRef]);

  return img;
};
