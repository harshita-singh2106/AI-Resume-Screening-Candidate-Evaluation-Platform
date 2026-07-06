import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Card
        sx={{
          width: 500,
          background: "#1e293b",
          color: "white",
          borderRadius: 4,
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        }}
      >
        <CardContent sx={{ textAlign: "center", p: 4 }}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              margin: "auto",
              bgcolor: "#22c55e",
              fontSize: 35,
              fontWeight: "bold",
            }}
          >
            H
          </Avatar>

          <Typography variant="h4" mt={2} fontWeight="bold">
            Harshita Singh
          </Typography>

          <Typography color="#94a3b8" mt={1}>
            AI Recruiter
          </Typography>

          <Typography mt={3}>
            📧 harshita@gmail.com
          </Typography>

          <Typography mt={1}>
            📱 +91-XXXXXXXXXX
          </Typography>

          <Typography mt={1}>
            💼 Role: Recruiter
          </Typography>

          <Box mt={3}>
            <Chip label="React" sx={{ m: 0.5 }} />
            <Chip label="Node.js" sx={{ m: 0.5 }} />
            <Chip label="MongoDB" sx={{ m: 0.5 }} />
            <Chip label="JavaScript" sx={{ m: 0.5 }} />
          </Box>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => alert("Edit Profile Coming Soon")}
          >
            Edit Profile
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2, ml: 2 }}
            onClick={() => navigate("/dashboard")}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}