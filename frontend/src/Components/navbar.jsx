// Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5050/logout", {}, { withCredentials: true });
      setSnackbarMessage("Logout successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Redirect to login page after a short delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Logout failed", error);
      setSnackbarMessage("Logout failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            7 Wonders Park
          </Typography>
         
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
