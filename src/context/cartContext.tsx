import React, { createContext, useContext, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { useQueryClient } from "@tanstack/react-query";

interface Fruit {
  id: string;
  name: string;
  quantity: number;
  value: number;
}

interface CartContextType {
  cart: Fruit[];
  addToCart: (product: Fruit) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => Promise<void>;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Fruit[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const addToCart = (product: Fruit) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const queryClient = useQueryClient();

  const clearCart = async () => {
    try {
      const cartCollection = collection(db, "cart");
      const snapshot = await getDocs(cartCollection);

      const deletePromises = snapshot.docs.map((docItem) =>
        deleteDoc(doc(db, "cart", docItem.id))
      );
      await Promise.all(deletePromises);

      setCart([]);

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error) {
      console.error("Error clearing cart: ", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
