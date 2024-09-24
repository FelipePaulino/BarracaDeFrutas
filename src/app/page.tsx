"use client";
import React from "react";
import Banner from "@/components/banner";
import HomeDisplay from "@/components/homeDisplay";
import FruitList from "@/components/fruitsList";
import Footer from "@/components/footer";
import ModalPurchase from "@/components/modalPurchase";
import Grid2 from "@mui/material/Grid2";

const Home = () => {
  return (
    <Grid2>
      <Banner />
      <ModalPurchase />
      <HomeDisplay />
      <FruitList />
      <Footer />
    </Grid2>
  );
};

export default Home;
