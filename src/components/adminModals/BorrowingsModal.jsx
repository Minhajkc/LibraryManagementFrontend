import React from "react";
import { Box, Modal, Typography } from "@mui/material";

const BorrowingsModal = ({ open, handleClose }) => {
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
          Active Borrowings
        </Typography>
        <Typography variant="body1" mb={1}>
          Borrower: John Doe
        </Typography>
        <Typography variant="body1" mb={1}>
          Book: "React for Beginners"
        </Typography>
        <Typography variant="body1">
          Due Date: January 20, 2025
        </Typography>
      </Box>
    </Modal>
  );
};

export default BorrowingsModal;
