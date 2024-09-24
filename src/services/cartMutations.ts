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
      name: string;
      quantity: number;
      value: number;
      url: string;
    }) => {
      const cartRef = collection(db, "cart");
      const snapshot = await getDocs(cartRef);
      let existingItemId: string | null = null;

      snapshot.forEach((doc) => {
        const item = doc.data();
        if (item.name === newProduct.name) {
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
            quantity: (existingProduct.quantity || 1) + newProduct.quantity,
            url: newProduct.url,
          });
        }
      } else {
        await addDoc(cartRef, newProduct);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData: { id: string; quantity: number }) => {
      const productRef = doc(db, "cart", updateData.id);
      await updateDoc(productRef, { quantity: updateData.quantity });
      return { id: updateData.id, quantity: updateData.quantity };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error updating quantity:", error);
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
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error removing item:", error);
    },
  });
};
