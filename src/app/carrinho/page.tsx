"use client";
import React, { useState } from "react";
import { useCartItems } from "@/services/cartQueries";
import { useUpdateQuantity, useRemoveItem } from "@/services/cartMutations";
import { useCart } from "@/context/cartContext";
import { useFilter } from "@/context/filterContext";
import { useRouter } from "next/navigation";
import {
  Button,
  Typography,
  TextField,
  Divider,
  Grid,
  Box,
  CardMedia,
} from "@mui/material";
import jsPDF from "jspdf";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import { z } from "zod";
import NoResults from "@/components/NoResults";

interface CarrinhoItem {
  id: string;
  fruta: string;
  quantidade: number;
  valor: number;
  url: string;
}

const quantitySchema = z
  .number()
  .min(1, { message: "A quantidade deve ser maior que 0" });

const CartPage = () => {
  const { data: carrinho = [], isLoading, isError } = useCartItems();
  const { filter } = useFilter();
  const { clearCart, setShowModal } = useCart();
  const { mutate: removeItem } = useRemoveItem();
  const { mutate: updateQuantity } = useUpdateQuantity();
  const router = useRouter();

  const [quantidadeErrors, setQuantidadeErrors] = useState<{
    [id: string]: string | null;
  }>({});

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const handleQuantityChange = (id: string, quantidade: string) => {
    const quantidadeParsed = Number(quantidade);

    const result = quantitySchema.safeParse(quantidadeParsed);

    if (result.success) {
      setQuantidadeErrors((prevErrors) => ({
        ...prevErrors,
        [id]: null,
      }));
      updateQuantity({ id, quantidade: quantidadeParsed });
    } else {
      setQuantidadeErrors((prevErrors) => ({
        ...prevErrors,
        [id]: result.error.errors[0].message,
      }));
    }
  };

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(255, 249, 204);
    doc.rect(0, 0, 210, 297, "F");

    doc.setFontSize(16);
    doc.text("Resumo da Compra", 10, 10);

    doc.setFontSize(12);
    doc.text("Fruta", 10, 30);
    doc.text("Quantidade", 80, 30);
    doc.text("Valor Unitário", 120, 30);
    doc.text("Total", 160, 30);

    let linha = 40;
    let valorTotal = 0;

    if (carrinho.length === 0) {
      doc.text("Carrinho vazio", 10, linha);
    } else {
      carrinho.forEach((item) => {
        const totalItem = item.valor * item.quantidade;
        valorTotal += totalItem;

        doc.text(item.fruta, 10, linha);
        doc.text(item.quantidade.toString(), 80, linha);
        doc.text(`R$ ${item.valor.toFixed(2)}`, 120, linha);
        doc.text(`R$ ${totalItem.toFixed(2)}`, 160, linha);

        linha += 10;
      });

      doc.text(`Valor Total: R$ ${valorTotal.toFixed(2)}`, 10, linha + 10);
    }

    doc.save("resumo-compra.pdf");

    clearCart();
    setShowModal(true);
    router.push("/");
  };

  const carrinhoFiltrado = carrinho.filter((item) =>
    item.fruta.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) {
    return <Typography variant="h6">Carregando carrinho...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6">Erro ao carregar o carrinho.</Typography>;
  }

  if (carrinhoFiltrado.length === 0) {
    return (
      <>
        <Banner />
        <NoResults />
        <Footer />
      </>
    );
  }

  const valorTotal = carrinhoFiltrado.reduce(
    (total, item) => total + item.valor * item.quantidade,
    0
  );

  return (
    <>
      <Banner />

      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Carrinho
        </Typography>

        <Grid container spacing={3}>
          {carrinhoFiltrado.map((item: CarrinhoItem) => (
            <Grid item xs={12} key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.url}
                  alt={item.fruta}
                  sx={{ width: 100, height: 100, objectFit: "contain" }}
                />

                <Box sx={{ flex: 1, marginLeft: "16px" }}>
                  <Typography variant="h6">{item.fruta}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Preço unitário: R$ {item.valor.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <TextField
                      type="number"
                      value={item.quantidade}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      error={!!quantidadeErrors[item.id]}
                      helperText={quantidadeErrors[item.id]}
                      InputProps={{ inputProps: { min: 1 } }}
                      sx={{
                        width: "80px",
                        "& input": {
                          textAlign: "center",
                        },
                      }}
                    />
                    <Box
                      onClick={() => handleRemove(item.id)}
                      sx={{ cursor: "pointer", marginTop: "10px" }}
                    >
                      <Typography variant="body1">Excluir</Typography>
                      <Divider sx={{ width: "100%" }} />
                    </Box>
                  </Box>
                  <Typography variant="body1">
                    R$ {(item.valor * item.quantidade).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ marginY: "16px" }} />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            padding: "16px",
            backgroundColor: "#f7f7f7",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6">
            Valor total: R$ {valorTotal.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={gerarPDF}
            sx={{
              padding: "10px 20px",
              backgroundColor: "#004d40",
              "&:hover": {
                backgroundColor: "#66bb6a",
              },
              fontWeight: "bold",
            }}
          >
            Finalizar Compra
          </Button>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
