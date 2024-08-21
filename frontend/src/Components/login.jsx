// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Link, Button, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5050/login", { email, password }, { withCredentials: true });
      if (result.data === "Success") {
        // No need to update authentication state here anymore
        navigate("/"); // Redirect to home page
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred during login. Please try again.");
    }
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

  return (
    <Grid container style={containerStyle}>
      <Paper style={paperStyle}>
        <Typography component="h1" variant="h5" style={headingStyle}>Login</Typography>
        <form onSubmit={handleLogin} style={formStyle}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            placeholder="Enter Email"
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
          <Button style={btnStyle} variant="contained" type="submit">Login</Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
