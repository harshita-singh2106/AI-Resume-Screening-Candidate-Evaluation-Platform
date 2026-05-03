import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1e293b, #020617)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >

      {/* 🔷 NAVBAR */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 5,
          py: 2
        }}
      >
        <Typography fontWeight="bold" fontSize="20px">
          AI RECRUIT HUB
        </Typography>

        {/* <Box sx={{ display: "flex", gap: 2 }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button color="inherit">Login</Button>
          </Link>

          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="success">
              Dashboard
            </Button>
          </Link>
        </Box> */}
      </Box>

      {/* 🔥 HERO SECTION */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3
        }}
      >
        <Box
          sx={{
            backdropFilter: "blur(25px)",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "20px",
            p: 6,
            textAlign: "center",
            maxWidth: "750px",
            width: "100%",
            boxShadow: "0 0 50px rgba(0,0,0,0.5)"
          }}
        >
          {/* HEADING */}
          <Typography variant="h3" fontWeight="bold" mb={2}>
            AI Resume Evaluation Platform 🚀
          </Typography>

          {/* SUBTEXT */}
          <Typography color="#94a3b8" mb={4} fontSize="18px">
            Smart hiring with AI — analyze, rank & shortlist candidates instantly
          </Typography>

          {/* BUTTONS */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="large">
                Login
              </Button>
            </Link>

            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button variant="outlined" size="large" color="inherit">
                Create Account
              </Button>
            </Link>

            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="success" size="large">
                Go to Dashboard
              </Button>
            </Link>

          </Box>

          {/* EXTRA TEXT */}
          <Typography mt={4} color="#64748b">
            Upload resumes • Analyze skills • Get top candidates instantly
          </Typography>
        </Box>
      </Box>

      {/* 🔻 FOOTER */}
      <Box
        sx={{
          textAlign: "center",
          py: 2,
          color: "#94a3b8",
          fontSize: "14px",
          borderTop: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        Made with ❤️ by <span style={{ color: "white" }}>Harshita Singh</span>
      </Box>

    </Box>
  );
}