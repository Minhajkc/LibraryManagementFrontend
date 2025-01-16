import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";

const NewOrdersModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Pending Orders
        </Typography>
        <Typography variant="body1" mb={1}>
          Order ID: #12345
        </Typography>
        <Typography variant="body1" mb={1}>
          Customer: Jane Smith
        </Typography>
        <Typography variant="body1" mb={1}>
          Total: $49.99
        </Typography>
        <Button variant="contained" color="primary" fullWidth>
          Process Order
        </Button>
      </Box>
    </Modal>
  );
};

export default NewOrdersModal;
