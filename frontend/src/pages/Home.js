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
        justifyContent: "space-between",
      }}
    >

      {/* 🔷 NAVBAR */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 5,
          py: 3,
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="28px"
          sx={{
            letterSpacing: "1px",
            background: "linear-gradient(to right, #38bdf8, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AI RECRUIT HUB
        </Typography>
      </Box>

      {/* 🔥 HERO SECTION */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
        }}
      >
        <Box
          sx={{
            backdropFilter: "blur(25px)",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "24px",
            p: 6,
            textAlign: "center",
            maxWidth: "800px",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 60px rgba(0,0,0,0.6)",
          }}
        >

          {/* 🚀 HEADING */}
          <Typography
            variant="h2"
            fontWeight="bold"
            mb={2}
            sx={{
              fontSize: {
                xs: "38px",
                md: "58px",
              },
              lineHeight: 1.2,
            }}
          >
            AI Resume Evaluation Platform 🚀
          </Typography>

          {/* ✨ SUBTEXT */}
          <Typography
            sx={{
              color: "#94a3b8",
              mb: 5,
              fontSize: "20px",
              lineHeight: 1.7,
            }}
          >
            Smart hiring with AI — analyze resumes, rank candidates,
            shortlist top talent and simplify recruitment instantly.
          </Typography>

          {/* 🔘 BUTTONS */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >

            {/* LOGIN */}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: "14px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  background:
                    "linear-gradient(to right, #06b6d4, #3b82f6)",
                  boxShadow: "0 0 20px rgba(59,130,246,0.5)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    background:
                      "linear-gradient(to right, #0891b2, #2563eb)",
                  },
                }}
              >
                LOGIN
              </Button>
            </Link>

            {/* CREATE ACCOUNT */}
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: "14px",
                  borderColor: "#a855f7",
                  color: "#e879f9",
                  fontWeight: "bold",
                  fontSize: "16px",
                  transition: "0.3s",
                  "&:hover": {
                    borderColor: "#c084fc",
                    background: "rgba(168,85,247,0.1)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                CREATE ACCOUNT
              </Button>
            </Link>

          </Box>

          {/* 🔻 EXTRA TEXT */}
          <Typography
            mt={5}
            color="#64748b"
            sx={{
              fontSize: "16px",
              letterSpacing: "0.5px",
            }}
          >
            Upload resumes • Analyze skills • Get top candidates instantly
          </Typography>
        </Box>
      </Box>

      {/* ❤️ FOOTER */}
      <Box
        sx={{
          textAlign: "center",
          py: 2,
          color: "#94a3b8",
          fontSize: "15px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        Made with ❤️ by{" "}
        <span
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Harshita Singh
        </span>
      </Box>
    </Box>
  );
}