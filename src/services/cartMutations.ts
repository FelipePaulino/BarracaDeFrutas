"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: {
      fruta: string;
      quantidade: number;
      valor: number;
      url: string;
    }) => {
      const cartRef = collection(db, "cart");
      const snapshot = await getDocs(cartRef);
      let existingItemId: string | null = null;

      snapshot.forEach((doc) => {
        const item = doc.data();
        if (item.fruta === newProduct.fruta) {
          existingItemId = doc.id;
        }
      });

      if (existingItemId) {
        const productRef = doc(db, "cart", existingItemId);
        const existingProduct = snapshot.docs
          .find((doc) => doc.id === existingItemId)
          ?.data();

        if (existingProduct) {
          await updateDoc(productRef, {
            quantidade:
              (existingProduct.quantidade || 1) + newProduct.quantidade,
            url: newProduct.url,
          });
        }
      } else {
        await addDoc(cartRef, newProduct);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carrinho"] });
    },
  });
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData: { id: string; quantidade: number }) => {
      const productRef = doc(db, "cart", updateData.id);
      await updateDoc(productRef, { quantidade: updateData.quantidade });
      return { id: updateData.id, quantidade: updateData.quantidade };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carrinho"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar a quantidade:", error);
    },
  });
};

export const useRemoveItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const itemRef = doc(db, "cart", id);
      await deleteDoc(itemRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carrinho"] });
    },
    onError: (error) => {
      console.error("Erro ao remover item:", error);
    },
  });
};
