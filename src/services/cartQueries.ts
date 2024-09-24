import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

export const fetchCartItems = async () => {
  const querySnapshot = await getDocs(collection(db, "cart"));
  const cartItems = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return cartItems;
};

export const useCartItems = () => {
  return useQuery<any[]>({
    queryKey: ["carrinho"],
    queryFn: fetchCartItems,
  });
};

export const fetchFrutas = async (): Promise<any[]> => {
  const frutasCollectionRef = collection(db, "frutas");
  const snapshot = await getDocs(frutasCollectionRef);
  const frutas = snapshot.docs.map((doc) => ({
    id: doc.id,
    fruta: doc.data().fruta,
    quantidade: doc.data().quantidade,
    valor: doc.data().valor,
    url: doc.data().url,
  }));
  return frutas;
};
