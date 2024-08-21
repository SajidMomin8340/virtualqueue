import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Link, Button, Paper, TextField, Typography } from "@mui/material";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      const result = await axios.post("http://localhost:5050/signup", { name, email, password });
      if (result.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Email already exists. Please use a different email.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const paperStyle = {
    padding: "2rem",
    margin: "100px auto",
    borderRadius: "15px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff"
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "600",
    marginBottom: "1.5rem"
  };

  const rowStyle = {
    marginTop: "1rem"
  };

  const btnStyle = {
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "#007bff",
    color: "#ffffff",
    borderRadius: "8px",
    textTransform: "none"
  };

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5"
  };

  return (
    <Grid container style={containerStyle}>
      <Paper style={paperStyle}>
        <Typography component="h1" variant="h5" style={headingStyle}>Sign Up</Typography>
        <form onSubmit={handleSignup}>
          <TextField
            style={rowStyle}
            fullWidth
            label="Enter Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            style={rowStyle}
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            style={rowStyle}
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error" variant="body2" style={{ marginTop: "1rem" }}>{error}</Typography>}
          <Button style={btnStyle} variant="contained" type="submit">Sign Up</Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignUp;
