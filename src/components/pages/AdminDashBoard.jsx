import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AddBookModal from "../adminModals/AddBookModal";
import BorrowingsModal from "../adminModals/BorrowingsModal";
import NewOrdersModal from "../adminModals/NewOrdersModal";
import BooksMap from "../adminModals/BooksMap";
import BorrowingsOverview from "../adminModals/BorrowingsOverview";
import PendingUsers from "../adminModals/PendingUsers";


const AdminDashboard = () => {
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [borrowingsOpen, setBorrowingsOpen] = useState(false);
  const [newOrdersOpen, setNewOrdersOpen] = useState(false);
  const [books, setBooks] = useState([]);

  const openAddBookModal = () => setAddBookOpen(true);
  const closeAddBookModal = () => setAddBookOpen(false);

  const openBorrowingsModal = () => setBorrowingsOpen(true);
  const closeBorrowingsModal = () => setBorrowingsOpen(false);

  const openNewOrdersModal = () => setNewOrdersOpen(true);
  const closeNewOrdersModal = () => setNewOrdersOpen(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        py: 4,
        px: 2,
      }}
    >
      <Typography variant="h3" fontWeight="bold" textAlign="center" mb={4}>
        Admin Dashboard
      </Typography>

     

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ borderRadius: 2 }}>

            <Card  sx={{ cursor: "pointer" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <LibraryBooksIcon sx={{ mr: 1 }} /> Returned And Delivered Orders
                </Typography>
                <Typography variant="body1">
                <BorrowingsOverview/>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Last updated: 2 hours ago
                </Typography>
              </CardContent>
            </Card>

          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <Card  sx={{ cursor: "pointer" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <ShoppingCartIcon sx={{ mr: 1 }} /> New Orders
                </Typography>
              <PendingUsers/>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>

      {/* Modals */}
      <AddBookModal  open={addBookOpen} handleClose={closeAddBookModal} />
      <BorrowingsModal open={borrowingsOpen} handleClose={closeBorrowingsModal} />
      <NewOrdersModal open={newOrdersOpen} handleClose={closeNewOrdersModal} />
      <BooksMap open={newOrdersOpen} handleClose={closeNewOrdersModal}  />
    </Box>
  );
};

export default AdminDashboard;
