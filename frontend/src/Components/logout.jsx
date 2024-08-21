import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

function Logout({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setIsLoggedIn(false);
                    navigate("/login");
                }
            })
            .catch(error => {
                console.error("Error logging out:", error);
            });
    };

    const buttonStyle = {
        fontSize: '1.2rem',
        fontWeight: '700',
        padding: '0.5rem 2rem',
        backgroundColor: '#d32f2f',  // Material-UI red color
        color: '#ffffff',
        borderRadius: '8px',
        textTransform: 'none',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            backgroundColor: '#c62828', // Darker shade of red on hover
        },
    };

    return (
        <Button 
            variant="contained" 
            style={buttonStyle} 
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
}

export default Logout;
