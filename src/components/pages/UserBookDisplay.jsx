import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Container,
  CircularProgress,
} from "@mui/material";
import {
  Book as BookIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  MenuBook as MenuBookIcon,
  CalendarToday as CalendarIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import axios from "axios";

const UserBookDisplay = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/books/getbooks");
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/borrow/${bookId}`,
        {},
        { withCredentials: true }
      );
      const updatedBook = response.data.book;
  
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId
            ? {
                ...book,
                availableCopies: updatedBook.availableCopies,
                isAvailable: updatedBook.isAvailable,
              }
            : book
        )
      );
      alert('Booking has been completed !')
      navigate('/profile')
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };
  
  
  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container>
        {/* Header Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MenuBookIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="h4" fontWeight="bold">
              Library Collection
            </Typography>
          </Box>
          <Link to="/profile">
            <IconButton size="large">
              <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Link>
        </Box>

        {/* Search Section */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
        </Box>

        {/* Books Grid */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book._id}>
                <Card 
                  sx={{ 
                    height: "100%", 
                    display: "flex", 
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                      <BookIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {book.title}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
                      <Typography variant="body1" color="text.secondary">
                        <BookmarkIcon sx={{ mr: 1, fontSize: "small" }} />
                        Author: {book.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <CalendarIcon sx={{ mr: 1, fontSize: "small" }} />
                        Published: {book.publishedYear}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Chip
                        label={`${book.availableCopies} copies`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={book.isAvailable ? "Available" : "Not Available"}
                        color={book.isAvailable ? "success" : "error"}
                        size="small"
                      />
                    </Box>

                    <Button
  variant="contained"
  fullWidth
  disabled={book.availableCopies <= 0 || !book.isAvailable} // Disable button if out of stock or not available
  onClick={() => handleBorrow(book._id)}
  sx={{
    mt: 2,
    bgcolor: book.availableCopies > 0 && book.isAvailable ? "primary.main" : "grey.300", // Set background color conditionally
  }}
  startIcon={<MenuBookIcon />}
>
  {book.availableCopies > 0 && book.isAvailable ? "Borrow Now" : "Out of Stock"} {/* Show text based on availability */}
</Button>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {filteredBooks.length === 0 && !loading && (
          <Box textAlign="center" mt={4}>
            <Typography variant="h6" color="text.secondary">
              No books found matching your search.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default UserBookDisplay;