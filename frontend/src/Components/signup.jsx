import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Link, Button, Paper, TextField, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await axios.post("http://localhost:5050/signup", { name, email, password, phone });
      setSnackbarMessage("Sign Up successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setSnackbarMessage("An error occurred during sign-up. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container style={containerStyle}>
      <Paper style={paperStyle}>
        <Typography component="h1" variant="h5" style={headingStyle}>Sign Up</Typography>
        <form onSubmit={handleSignUp} style={formStyle}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {error && <Typography color="error" variant="body2" style={{ marginTop: "1rem" }}>{error}</Typography>}
          {success && <Typography color="success" variant="body2" style={{ marginTop: "1rem", color: 'green' }}>{success}</Typography>}
          <Button style={btnStyle} variant="contained" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} /> : 'Sign Up'}
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        ContentProps={{
          sx: snackbarStyle
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={snackbarStyle}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

const paperStyle = {
  padding: "2rem",
  width: "90%",
  maxWidth: "400px",
  margin: "auto",
  borderRadius: "15px",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#ffffff",
};

const headingStyle = {
  fontSize: "2.5rem",
  fontWeight: "600",
  marginBottom: "1.5rem",
  textAlign: "center"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const btnStyle = {
  marginTop: "1rem",
  fontSize: "1.2rem",
  fontWeight: "700",
  backgroundColor: "#007bff",
  color: "#ffffff",
  borderRadius: "8px",
  textTransform: "none",
  alignSelf: "center"
};

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f2f5",
};

const snackbarStyle = {
  backgroundColor: "#000000", // Black background
  color: "#ffffff", // White text
};

export default SignUp;
