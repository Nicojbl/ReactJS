import {
  collection, // permite acceder a una colección en la base de datos
  doc, // permite acceder a un documento en la base de datos
  getDoc, // permite recuperar un documento de la base de datos
  getDocs, // permite recuperar varios documentos de la base de datos
  getFirestore, // permite acceder a la instancia de Firestore
  query, // permite crear una consulta para filtrar documentos en la base de datos
  where, // permite especificar una condición para una consulta
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// constante que almacena el nombre de la colección de items en la base de datos
const ITEMS_COLLECTION = "items";

// función que recupera un item o varios items de la base de datos
const getItems = (db, category, id) => {
  const ref = id
    ? doc(db, ITEMS_COLLECTION, id)
    : collection(db, ITEMS_COLLECTION);

  // si se especificó una categoría, se filtra la consulta por esa categoría
  if (category) {
    const queryRef = query(ref, where("category", "==", category));
    return getDocs(queryRef).then((result) =>
      result.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  }

  // si se especificó un ID, se recupera el item específico
  if (id) {
    return getDoc(ref)
      .then((item) => {
        if (item.exists()) {
          return { id: item.id, ...item.data() };
        }
      })
      .catch((err) => console.error({ err }));
  }

  // si no se especificó ningún ID ni categoría, se recuperan todos los items
  return getDocs(ref).then((result) =>
    result.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  );
};

// función de custom hook que permite recuperar un item o varios items de la base de datos
export const useGetItem = () => {
  // estado que almacena los items recuperados
  const [data, setData] = useState(null);
  const { category, id } = useParams();

  const db = getFirestore();

  useEffect(() => {
    getItems(db, category, id).then(setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, id]);

  return data;
};
