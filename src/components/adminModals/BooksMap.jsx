import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import AddBookModal from "./AddBookModal"; // Import AddBookModal
import EditBookModal from "./EditBookModal"; // Import EditBookModal (new edit modal component)

const BooksMap = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);  // State to control add book modal visibility
  const [openEditModal, setOpenEditModal] = useState(false);  // State to control edit book modal visibility
  const [editingBook, setEditingBook] = useState(null);  // Book to be edited

  const fetchBooks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/books/getbooks?page=${page}`);
      setBooks(response.data.books); // Update books list
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId)); // Update books list
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const toggleAvailability = async (bookId, currentStatus) => {
    try {
      const updatedAvailability = !currentStatus;
      await axios.patch(`http://localhost:5000/api/books/${bookId}/availability`, { isAvailable: updatedAvailability }, { withCredentials: true });
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? { ...book, isAvailable: updatedAvailability } : book
        )
      );
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenEditModal = (book) => {
    setEditingBook(book); // Set the book to be edited
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setEditingBook(null); // Clear the book being edited
    setOpenEditModal(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>Add Book</Button>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={4}>
          {books.map((book) => (
            <Grid item xs={12} md={6} key={book._id}>
              <Paper elevation={3} sx={{ borderRadius: 2 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {book.title}
                    </Typography>
                    <Typography variant="body1">Author: {book.author}</Typography>
                    <Typography variant="body1">ISBN: {book.isbn}</Typography>
                    <Typography variant="body1">Published Year: {book.publishedYear}</Typography>
                    <Typography variant="body1">Available Copies: {book.availableCopies}</Typography>
                    <Typography variant="body1" className="text-yellow-400">
                      {book.isAvailable === true ? 'Available' : 'Not Available'}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      sx={{ mt: 2 }}
                      onClick={() => handleOpenEditModal(book)} // Open edit modal on click
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(book._id)}
                      sx={{ mt: 2, ml: 2 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color={book.isAvailable ? "success" : "error"}
                      onClick={() => toggleAvailability(book._id, book.isAvailable)}
                      sx={{ mt: 2, ml: 2 }}
                    >
                      {book.isAvailable ? "Available" : "Not Available"}
                    </Button>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* AddBookModal Component */}
      <AddBookModal open={openModal} handleClose={handleCloseModal} setBooks={setBooks} />

      {/* EditBookModal Component */}
      <EditBookModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        book={editingBook} // Pass the book to edit
        setBooks={setBooks}
      />
    </div>
  );
};

export default BooksMap;
