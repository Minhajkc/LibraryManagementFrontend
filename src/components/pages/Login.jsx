import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
  InputAdornment,
  Avatar,
  Alert,
} from "@mui/material";
import { Mail, Lock, LibraryBooks } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({setIsUserAuthenticated}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); 
  const [serverError, setServerError] = useState(""); 
    const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; 

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      },{withCredentials:true});
      setIsUserAuthenticated(true)
      navigate('/UserDashBoard');
      alert("Login successful!");
      localStorage.setItem("token", response.data.token);

      setServerError("");
      setPassword('')
      setEmail('')
    } catch (error) {
      setServerError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Avatar
            sx={{
              mb: 2,
              bgcolor: "primary.main",
              width: 56,
              height: 56,
            }}
          >
            <LibraryBooks sx={{ fontSize: 32 }} />
          </Avatar>

          <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={4} textAlign="center">
            Please sign in to access your library account
          </Typography>

          {serverError && (
            <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
              {serverError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              Sign In
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    fontWeight: "500",
                    color: "#1976d2",
                  }}
                >
                  Create an account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
