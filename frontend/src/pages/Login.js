import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (data.token) {

        localStorage.setItem("token", data.token);

        alert("Login Successful 🚀");

        navigate("/dashboard");

      } else {
        alert(data.message || "Invalid Credentials");
      }

    } catch (err) {
      alert("Server Error");
    }
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e293b, #020617)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2
      }}
    >

      {/* LOGIN CARD */}
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: 6,
          borderRadius: "28px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(25px)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
          textAlign: "center",
          boxShadow: "0 0 50px rgba(0,0,0,0.5)"
        }}
      >

        {/* TITLE */}
        <Typography
          variant="h2"
          fontWeight="bold"
          mb={1}
          sx={{
            fontSize: {
              xs: "42px",
              md: "64px"
            }
          }}
        >
          Welcome Back 👋
        </Typography>

        {/* SUBTITLE */}
        <Typography
          color="#94a3b8"
          mb={5}
          fontSize="20px"
        >
          Login to continue your AI hiring journey
        </Typography>

        {/* EMAIL */}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            style: { color: "#94a3b8" }
          }}
          sx={{
            input: {
              color: "white",
              py: 1.8
            },

            "& .MuiOutlinedInput-root": {
              borderRadius: "18px",
              background: "rgba(255,255,255,0.04)",

              "& fieldset": {
                borderColor: "#334155"
              },

              "&:hover fieldset": {
                borderColor: "#38bdf8"
              },

              "&.Mui-focused fieldset": {
                borderColor: "#38bdf8"
              }
            }
          }}
        />

        {/* PASSWORD */}
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            style: { color: "#94a3b8" }
          }}
          sx={{
            mt: 3,

            input: {
              color: "white",
              py: 1.8
            },

            "& .MuiOutlinedInput-root": {
              borderRadius: "18px",
              background: "rgba(255,255,255,0.04)",

              "& fieldset": {
                borderColor: "#334155"
              },

              "&:hover fieldset": {
                borderColor: "#38bdf8"
              },

              "&.Mui-focused fieldset": {
                borderColor: "#38bdf8"
              }
            }
          }}
        />

        {/* LOGIN BUTTON */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            mt: 5,
            py: 2,
            borderRadius: "18px",
            fontWeight: "bold",
            fontSize: "18px",

            background:
              "linear-gradient(to right, #06b6d4, #3b82f6)",

            boxShadow:
              "0 0 30px rgba(59,130,246,0.5)",

            transition: "0.3s",

            "&:hover": {
              transform: "translateY(-2px)",

              background:
                "linear-gradient(to right, #0891b2, #2563eb)"
            }
          }}
        >
          LOGIN
        </Button>

        {/* EXTRA OPTIONS */}
        <Box
          mt={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >

          <Typography
            fontSize="14px"
            color="#94a3b8"
            sx={{
              cursor: "pointer",
              transition: "0.3s",

              "&:hover": {
                color: "#38bdf8"
              }
            }}
          >
            Forgot Password?
          </Typography>

          <Typography
            fontSize="14px"
            color="#94a3b8"
          >
            New here?{" "}

            <span
              style={{
                color: "#38bdf8",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Sign Up
            </span>

          </Typography>

        </Box>

        {/* EXTRA TEXT */}
        <Typography
          mt={4}
          color="#64748b"
          fontSize="13px"
        >
          Secure AI-powered recruitment platform
        </Typography>

      </Paper>

    </Box>
  );
}