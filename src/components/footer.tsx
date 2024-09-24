"use client";
import React from "react";
import { Grid2 } from "@mui/material";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push("/");
  };

  return (
    <Grid2
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ background: "#004d40" }}
      padding={"20px"}
      marginTop={5}
    >
      <Grid2 onClick={handleGoToHome}>
        <img
          src="/logoPro.png"
          alt="logoPro"
          width={"150px"}
          height={"150px"}
          style={{ cursor: "pointer" }}
        />
      </Grid2>
    </Grid2>
  );
};

export default Footer;
