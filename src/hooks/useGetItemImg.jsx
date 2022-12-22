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
    getDownloadURL(productImgRef)
      .then((data) => setImg(data))
      .catch((err) => console.error({ err }));
  }, [productImgRef]);

  return img;
};
