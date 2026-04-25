import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } else {
      alert("Login failed");
    }
  };

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4">Login</Typography>

      <TextField
        label="Email"
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}