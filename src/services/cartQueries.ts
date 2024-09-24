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
    queryKey: ["cart"],
    queryFn: fetchCartItems,
  });
};

export const fetchFruits = async (): Promise<any[]> => {
  const fruitsCollectionRef = collection(db, "fruits");
  const snapshot = await getDocs(fruitsCollectionRef);
  const fruits = snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    quantity: doc.data().quantity,
    value: doc.data().value,
    url: doc.data().url,
  }));
  return fruits;
};
