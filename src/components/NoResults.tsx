import React from "react";
import { Typography, Box } from "@mui/material";

interface NoResultsProps {
  message?: string;
}

const NoResults: React.FC<NoResultsProps> = ({ message }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
    >
      <img
        src="/cherry-dont-go.gif"
        alt="cherry-dont-go"
        style={{ maxWidth: "150px", marginBottom: "20px" }}
      />
      <Typography variant="h6" color="textSecondary">
        {message || "Nenhum resultado encontrado"}
      </Typography>
    </Box>
  );
};

export default NoResults;
