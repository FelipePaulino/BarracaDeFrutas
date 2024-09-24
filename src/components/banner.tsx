"use client";
import React, { useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useFilter } from "@/context/filterContext";
import { useCartItems } from "@/services/cartQueries";
import { searchSchema } from "@/types/validationSchema";

const Banner = () => {
  const { setFilter } = useFilter();
  const { data: cart = [] } = useCartItems();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const result = searchSchema.safeParse(value);

    if (!result.success) {
      setErrorMessage(result.error.errors[0].message);
    } else {
      setErrorMessage(null);
      setFilter(value);
    }
  };

  const handleGoToCart = () => {
    router.push("/carrinho");
  };

  const handleGoToNewFruits = () => {
    router.push("/novasFrutas");
  };

  const handleGoToHome = () => {
    router.push("/");
  };

  return (
    <Grid
      container
      display={"flex"}
      justifyContent={isMobile ? "center" : "space-between"}
      alignItems={"center"}
      direction={isMobile ? "column" : "row"}
      sx={{
        background: "#004d40",
        padding: isMobile ? "10px" : "20px",
      }}
    >
      <Grid onClick={handleGoToHome} sx={{ mb: isMobile ? 2 : 0 }}>
        <img
          src="/logoPro.png"
          alt="logoPro"
          width={isMobile ? "120px" : "150px"}
          height={isMobile ? "120px" : "150px"}
          style={{ cursor: "pointer" }}
        />
      </Grid>

      <Grid
        display={"flex"}
        flexDirection={isMobile ? "column" : "row"}
        alignItems={"center"}
        gap={isMobile ? 2 : 0}
      >
        <TextField
          name="Outlined"
          placeholder="Pesquisar..."
          variant="outlined"
          error={!!errorMessage}
          helperText={errorMessage || ""}
          sx={{
            backgroundColor: "#ccc",
            borderRadius: "20px",
            height: isMobile ? "35px" : "50px",
            width: isMobile ? "100%" : "auto",
            "& fieldset": {
              borderRadius: "20px",
            },
            "& .MuiInputBase-input": {
              height: isMobile ? "35px" : "50px",
              padding: "0 14px",
            },
          }}
          onChange={handleInputChange}
          inputProps={{
            style: { height: isMobile ? "35px" : "50px" },
          }}
        />

        <IconButton
          onClick={handleGoToCart}
          aria-label={`Ir para o carrinho com ${totalCartItems} itens`}
        >
          <Badge
            badgeContent={totalCartItems}
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: isMobile ? "12px" : "14px",
                right: isMobile ? "10px" : "15px",
                top: isMobile ? "10px" : "15px",
              },
            }}
          >
            <img
              src="/carrinho.png"
              alt="Carrinho de compras"
              width={isMobile ? "60px" : "80px"}
              height={isMobile ? "60px" : "80px"}
            />
          </Badge>
        </IconButton>
        <Tooltip title="Adicione sua Fruta">
          <IconButton onClick={handleGoToNewFruits}>
            <img
              src="/add.webp"
              alt="Carrinho de compras"
              width={isMobile ? "60px" : "65x"}
              height={isMobile ? "60px" : "65px"}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default Banner;
