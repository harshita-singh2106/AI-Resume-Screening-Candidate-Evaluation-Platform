import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  Avatar
} from "@mui/material";

export default function Dashboard() {

  // 🔐 Protect route
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }

  const [topCandidates, setTopCandidates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/top-candidates")
      .then(res => res.json())
      .then(data => setTopCandidates(data));
  }, []);

  return (
    <Box sx={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>

      {/* 🔷 NAVBAR */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "#1e293b"
      }}>

        <Typography fontWeight="bold">AI RECRUIT HUB</Typography>

        <TextField
          placeholder="Search candidates..."
          size="small"
          sx={{
            background: "white",
            borderRadius: "8px",
            width: "300px"
          }}
        />

        <Box sx={{ display: "flex", gap: 3 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
          <Link to="/upload" style={{ color: "white", textDecoration: "none" }}>Upload</Link>
        </Box>

      </Box>

      {/* 🔷 MAIN */}
      <Box sx={{ display: "flex" }}>

        {/* 🔹 SIDEBAR */}
        <Box sx={{
          width: "200px",
          background: "#1e293b",
          height: "calc(100vh - 60px)",
          padding: "20px"
        }}>
          <Typography mb={2}>🏠 Dashboard</Typography>
          <Typography mb={2}>💼 Jobs</Typography>
          <Typography mb={2}>👥 Candidates</Typography>
          <Typography mb={2}>📊 Analytics</Typography>
        </Box>

        {/* 🔹 CONTENT GRID */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 3,
          padding: 3,
          flex: 1
        }}>

          {/* 🔸 COLUMN 1 */}
          <Card sx={{ background: "#1e293b", color: "white", borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">Job Feed</Typography>
              <Typography mt={2} color="gray">Coming soon...</Typography>
            </CardContent>
          </Card>

          {/* 🔸 COLUMN 2 (MAIN PART) */}
          <Card sx={{ background: "#1e293b", color: "white", borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">⭐ Candidate List</Typography>

              {topCandidates.map((c, i) => (
                <Box key={i}
                  sx={{
                    mt: 2,
                    p: 2,
                    background: "#0f172a",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >

                  {/* LEFT */}
                  <Box>
                    <Typography fontWeight="bold">
                      Candidate {i + 1}
                    </Typography>

                    <Box mt={1}>
                      {c.skills.slice(0, 3).map((s, i) => (
                        <Chip
                          key={i}
                          label={s}
                          sx={{
                            mr: 1,
                            mt: 1,
                            background: "#1e293b",
                            color: "white"
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* RIGHT (SCORE CIRCLE STYLE) */}
                  <Box sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    border: "5px solid #22c55e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold"
                  }}>
                    {c.score}%
                  </Box>

                </Box>
              ))}

            </CardContent>
          </Card>

          {/* 🔸 COLUMN 3 */}
          <Card sx={{ background: "#1e293b", color: "white", borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">Deep Analysis</Typography>

              <Box mt={2} sx={{
                background: "#0f172a",
                p: 2,
                borderRadius: "10px"
              }}>
                <Typography fontWeight="bold">AI Summary</Typography>
                <Typography color="gray" mt={1}>
                  Candidate analysis will appear here...
                </Typography>
              </Box>

            </CardContent>
          </Card>

        </Box>
      </Box>
    </Box>
  );
}