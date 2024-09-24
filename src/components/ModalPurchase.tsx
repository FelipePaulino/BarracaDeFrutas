"use client";
import React from "react";
import { Modal, Box, Typography, Button, Grid2 } from "@mui/material";
import { useCart } from "@/context/cartContext";

const ModalPurchase = () => {
  const { showModal, setShowModal } = useCart();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Grid2>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: "blur(3px)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 300, sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
            animation: "fadeIn 0.3s ease-out",
            background: " #66bb6a",
            border: "1px solid #004d40",
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              color: "#004d40",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Obrigado pela sua compra!
          </Typography>
          <Typography
            id="modal-description"
            sx={{
              mb: 2,
              color: "#ececece",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Sua compra foi finalizada com sucesso. Agradecemos por comprar com a
            gente!
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{
                backgroundColor: "#004d40",
                color: "#fff",
                padding: "10px 20px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              }}
            >
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid2>
  );
};

export default ModalPurchase;
