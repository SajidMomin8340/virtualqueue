import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Link,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // State for admin checkbox
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isAdmin) {
        // Admin login logic
        if (email === "admin" && password === "admin") {
          setSnackbarMessage("Admin login successful!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/admin"), 2000); // Redirect to admin page
        } else {
          setSnackbarMessage("Invalid admin credentials.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      } else {
        // Regular user login logic
        const result = await axios.post("http://localhost:5050/login", { email, password }, { withCredentials: true });
        if (result.data.message === "Success") {
          setSnackbarMessage("Login successful!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          onLogin();
          setTimeout(() => navigate("/"), 2000);
        } else {
          setSnackbarMessage("Login failed. Please check your credentials.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      }
    } catch (err) {
      console.error(err);
      setSnackbarMessage("An error occurred during login. Please try again.");
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
        <Typography component="h1" variant="h5" style={headingStyle}>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={formStyle}>
          <TextField
            fullWidth
            label={isAdmin ? "Username" : "Email"} // Changes label based on login type
            variant="outlined"
            type={isAdmin ? "text" : "email"} // Changes input type for admin login
            placeholder={isAdmin ? "Enter Admin Username" : "Enter Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControlLabel
            control={<Checkbox checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />}
            label="Login as Admin"
            style={{ alignSelf: "flex-start", marginTop: "1rem" }} // Adjusted style for positioning
          />
          {error && (
            <Typography color="error" variant="body2" style={{ marginTop: "1rem" }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success" variant="body2" style={{ marginTop: "1rem", color: "green" }}>
              {success}
            </Typography>
          )}
          <Button style={btnStyle} variant="contained" type="submit" disabled={loading}>
            {loading ? (
              <CircularProgress
                size={24}
                style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </Typography>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        ContentProps={{
          sx: snackbarStyle,
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
  textAlign: "center",
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
  alignSelf: "center",
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

export default Login;
