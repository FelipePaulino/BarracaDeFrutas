"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fruitSchema, FruitFormInputs } from "@/types/validationSchema";
import { db } from "@/services/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import { useFilter } from "@/context/filterContext";
import NoResults from "@/components/noResults";

interface Fruit {
  id: string;
  name: string;
  quantity: number;
  value: number;
  url: string;
}

export const fetchFruits = async (): Promise<Fruit[]> => {
  const fruitsCollectionRef = collection(db, "fruits");
  const snapshot = await getDocs(fruitsCollectionRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Fruit, "id">),
  }));
};

const AddFruit = () => {
  const [editId, setEditId] = useState<string | null>(null);

  const { filter, setFilter } = useFilter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FruitFormInputs>({
    resolver: zodResolver(fruitSchema),
  });

  const queryClient = useQueryClient();

  const {
    data: fruits = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
  });

  const mutation = useMutation({
    mutationFn: async (data: FruitFormInputs) => {
      try {
        if (editId) {
          const fruitDocRef = doc(db, "fruits", editId);
          await updateDoc(fruitDocRef, data);
        } else {
          const fruitsCollectionRef = collection(db, "fruits");
          await addDoc(fruitsCollectionRef, data);
        }
      } catch (error) {
        console.error("Error adding/updating fruit:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fruits"] });
      clearFields();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      const fruitDocRef = doc(db, "fruits", id);
      return deleteDoc(fruitDocRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fruits"] });
    },
  });

  const save = (data: FruitFormInputs) => {
    const valueConverted = data.value;
    const convertedData = {
      ...data,
      quantity: Number(data.quantity),
      value: valueConverted,
    };
    mutation.mutate(convertedData);
  };

  function clearFields() {
    reset();
    setEditId(null);
  }

  function handleEdit(fruit: Fruit) {
    setValue("name", fruit.name);
    setValue("quantity", fruit.quantity);
    setValue("value", fruit.value);
    setValue("url", fruit.url);
    setEditId(fruit.id);
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id);
  }

  const filteredFruits = fruits.filter((fruit) =>
    fruit.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) return <Typography variant="h6">Carregando...</Typography>;
  if (isError)
    return <Typography variant="h6">Erro ao carregar frutas</Typography>;

  return (
    <>
      <Banner />

      <Grid container justifyContent="space-between" sx={{ padding: "20px" }}>
        <Grid item xs={11} md={5}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
              {editId ? "Editar Fruta" : "Adicionar Fruta"}
            </Typography>
            <form onSubmit={handleSubmit(save)}>
              <Box mb={2}>
                <TextField
                  {...register("name")}
                  label="Fruta"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  {...register("quantity")}
                  label="Quantidade"
                  type="number"
                  fullWidth
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  {...register("value")}
                  label="Valor"
                  type="text"
                  fullWidth
                  error={!!errors.value}
                  helperText={errors.value?.message}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  {...register("url")}
                  label="URL da Imagem"
                  type="text"
                  fullWidth
                  error={!!errors.url}
                  helperText={errors.url?.message}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button type="submit" variant="contained" color="primary">
                  {editId ? "Salvar Edição" : "Adicionar Fruta"}
                </Button>
                {editId && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={clearFields}
                  >
                    Cancelar Edição
                  </Button>
                )}
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Lista de Frutas
            </Typography>

            {filteredFruits.length === 0 ? (
              <NoResults message="Nenhuma fruta encontrada com o filtro aplicado." />
            ) : (
              filteredFruits.map((fruit, index) => (
                <React.Fragment key={fruit.id}>
                  <Box
                    mb={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{fruit.name}</Typography>
                      <Typography variant="body2">
                        Quantidade: {fruit.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Valor: R$ {fruit.value.toFixed(2)}
                      </Typography>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(fruit)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(fruit.id)}
                        >
                          Excluir
                        </Button>
                      </Box>
                    </Box>
                    <img
                      src={fruit.url}
                      alt={fruit.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        marginLeft: "20px",
                      }}
                    />
                  </Box>
                  {index < filteredFruits.length - 1 && (
                    <Divider sx={{ mb: 2 }} />
                  )}
                </React.Fragment>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default AddFruit;
