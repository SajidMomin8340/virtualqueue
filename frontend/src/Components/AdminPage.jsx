// src/AdminPage.jsx
import React from "react";
import { Typography, Container, Paper } from "@mui/material";

const AdminPage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Paper elevation={3} style={adminPageStyle}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the Admin Dashboard! Here you can manage all the administrative tasks.
        </Typography>
        {/* Add more admin-related components or content here */}
      </Paper>
    </Container>
  );
};

const adminPageStyle = {
  padding: "2rem",
  textAlign: "center",
};

export default AdminPage;
