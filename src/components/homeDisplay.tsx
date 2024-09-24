"use client";
import { Grid2 } from "@mui/material";
import React from "react";
import Slider from "react-slick";

const HomeDisplay = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Grid2 display={"flex"} flexDirection={"column"} gap={10} padding={5}>
      <Slider {...settings}>
        <Grid2 height={"350px"}>
          <img
            src="/bd1.jpg"
            alt="bd.png"
            style={{
              width: "100%",
              height: "350px",
            }}
          />
        </Grid2>
        <Grid2 height={"350px"}>
          <img
            src="/bd2.avif"
            alt="logoPro"
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
          />
        </Grid2>
        <Grid2 height={"350px"}>
          <img
            src="/bd3.jpg"
            alt="logoPro"
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
          />
        </Grid2>
        <Grid2 height={"350px"}>
          <img
            src="/bd4.webp"
            alt="logoPro"
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
          />
        </Grid2>
        <Grid2 height={"350px"}>
          <img
            src="/bd5.webp"
            alt="logoPro"
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
          />
        </Grid2>
      </Slider>
    </Grid2>
  );
};

export default HomeDisplay;
