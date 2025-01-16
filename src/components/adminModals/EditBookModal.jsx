import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const EditBookModal = ({ open, handleClose, book, setBooks }) => {
  const [editedBook, setEditedBook] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    availableCopies: 0,
  });

  useEffect(() => {
    if (book) {
      setEditedBook({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        availableCopies: book.availableCopies,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/books/${book._id}`, editedBook,{withCredentials:true});
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b._id === book._id ? { ...b, ...editedBook } : b
        )
      );
      handleClose();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, padding: 3, backgroundColor: "white", margin: "auto", mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Edit Book
        </Typography>
        <TextField
          label="Title"
          fullWidth
          name="title"
          value={editedBook.title}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Author"
          fullWidth
          name="author"
          value={editedBook.author}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="ISBN"
          fullWidth
          name="isbn"
          value={editedBook.isbn}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Published Year"
          fullWidth
          name="publishedYear"
          value={editedBook.publishedYear}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Available Copies"
          fullWidth
          name="availableCopies"
          value={editedBook.availableCopies}
          onChange={handleChange}
          type="number"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditBookModal;
