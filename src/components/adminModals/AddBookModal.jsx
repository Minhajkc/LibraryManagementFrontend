import React, { useState } from "react";
import { Box, Modal, Typography, Button, TextField } from "@mui/material";
import axios from "axios";

const AddBookModal = ({ open, handleClose, setBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [availableCopies, setAvailableCopies] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/books/Createbook", {
        title,
        author,
        isbn,
        publishedYear,
        availableCopies,
      }, { withCredentials: true });
      
      alert('Book added successfully');
      
      // Update the books list in the parent component
      setBooks((prevBooks) => [...prevBooks, response.data.book]);

      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

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
          Add a New Book
        </Typography>
        <TextField
          label="Book Title"
          fullWidth
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Author"
          fullWidth
          variant="outlined"
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          label="ISBN"
          fullWidth
          variant="outlined"
          margin="normal"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <TextField
          label="Published Year"
          fullWidth
          variant="outlined"
          margin="normal"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
        />
        <TextField
          label="Available Copies"
          fullWidth
          variant="outlined"
          margin="normal"
          type="number"
          value={availableCopies}
          onChange={(e) => setAvailableCopies(Number(e.target.value))}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddBookModal;
