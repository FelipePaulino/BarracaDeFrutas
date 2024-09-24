import React, { createContext, useContext, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { useQueryClient } from "@tanstack/react-query";

interface Fruit {
  id: string;
  fruta: string;
  quantidade: number;
  valor: number;
}

interface CartContextType {
  carrinho: Fruit[];
  addToCart: (fruta: Fruit) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => Promise<void>;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carrinho, setCarrinho] = useState<Fruit[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const addToCart = (produto: Fruit) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, produto]);
  };

  const removeFromCart = (id: string) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.filter((item) => item.id !== id)
    );
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

      setCarrinho([]);

      queryClient.invalidateQueries({ queryKey: ["carrinho"] });
    } catch (error) {
      console.error("Erro ao limpar o carrinho: ", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        carrinho,
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
