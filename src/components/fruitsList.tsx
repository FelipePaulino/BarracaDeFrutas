"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAddToCart } from "@/services/cartMutations";
import { fetchFruits } from "@/services/cartQueries";
import { useFilter } from "@/context/filterContext";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import NoResults from "@/components/noResults";

interface Fruit {
  id: string;
  name: string;
  quantity: number;
  value: number;
  url: string;
}

const FruitList = () => {
  const { filter, setFilter } = useFilter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const {
    data: fruits = [],
    isLoading,
    isError,
  } = useQuery<Fruit[]>({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
  });

  const { mutate: addToCart } = useAddToCart();

  const filteredFruits = fruits.filter((fruit) =>
    fruit.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddToCart = (fruit: Fruit) => {
    setLoadingId(fruit.id);
    addToCart(
      {
        name: fruit.name,
        quantity: 1,
        value: fruit.value,
        url: fruit.url,
      },
      {
        onSettled: () => setLoadingId(null),
      }
    );
  };

  useEffect(() => {
    return () => {
      setFilter("");
    };
  }, [setFilter]);

  if (isLoading) {
    return <Typography variant="h6">Carregando frutas...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6">Erro ao carregar frutas</Typography>;
  }

  if (filteredFruits.length === 0) {
    return <NoResults message="Não encontramos frutas com esse nome." />;
  }

  return (
    <Grid style={{ padding: "40px" }}>
      <Typography variant="h4" gutterBottom align="center" style={{ color: '#666' }}>
        Lista de Frutas
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {filteredFruits.map((fruit: Fruit) => (
          <Grid item key={fruit.id} xs={12} sm={6} md={4} lg={2}>
            <Card
              sx={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <AspectRatio
                minHeight="150px"
                maxHeight="150px"
                sx={{ backgroundColor: "#f0f0f0" }}
              >
                <img
                  src={fruit.url}
                  alt={fruit.name}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
              </AspectRatio>
              <CardContent
                sx={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {fruit.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ marginBottom: "10px" }}
                >
                  Preço: R$ {fruit.value.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(fruit)}
                  disabled={loadingId === fruit.id}
                  sx={{
                    backgroundColor: "#004d40",
                    "&:hover": {
                      backgroundColor: "#66bb6a",
                    },
                    fontWeight: "bold",
                  }}
                >
                  {loadingId === fruit.id
                    ? "Adicionando..."
                    : "Adicionar ao Carrinho"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default FruitList;
