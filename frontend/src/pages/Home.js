import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent
} from "@mui/material";

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
      {/* NAVBAR */}
      <Box
        sx={{
          px: 5,
          py: 3
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="30px"
          sx={{
            background: "linear-gradient(to right, #38bdf8, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          AI RECRUIT HUB
        </Typography>
      </Box>

      {/* HERO SECTION */}
      <Box
        sx={{
          textAlign: "center",
          px: 3
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          mb={2}
          sx={{
            fontSize: {
              xs: "38px",
              md: "58px"
            }
          }}
        >
          AI Resume Evaluation Platform 🚀
        </Typography>

        <Typography
          sx={{
            color: "#94a3b8",
            maxWidth: "850px",
            mx: "auto",
            fontSize: "20px",
            lineHeight: 1.8,
            mb: 5
          }}
        >
          Smart hiring powered by Artificial Intelligence.
          Analyze resumes, rank candidates, match skills,
          and shortlist top talent instantly.
        </Typography>

        <Link
          to="/login"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.8,
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: "16px",
              background:
                "linear-gradient(to right, #06b6d4, #3b82f6)",
              boxShadow:
                "0 0 25px rgba(59,130,246,0.5)"
            }}
          >
            LOGIN
          </Button>
        </Link>

        <Typography
          mt={4}
          color="#64748b"
        >
          Upload resumes • Analyze skills • Rank candidates • Hire smarter
        </Typography>
      </Box>

      {/* FEATURES */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          px: 3,
          py: 5
        }}
      >
        <Card
          sx={{
            width: 280,
            background: "rgba(255,255,255,0.05)",
            color: "white",
            borderRadius: 4
          }}
        >
          <CardContent>
            <Typography variant="h5">
              📄 Resume Upload
            </Typography>

            <Typography mt={2} color="#94a3b8">
              Upload candidate resumes and manage applications efficiently.
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: 280,
            background: "rgba(255,255,255,0.05)",
            color: "white",
            borderRadius: 4
          }}
        >
          <CardContent>
            <Typography variant="h5">
              🤖 AI Analysis
            </Typography>

            <Typography mt={2} color="#94a3b8">
              Automatically evaluate skills and generate candidate scores.
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: 280,
            background: "rgba(255,255,255,0.05)",
            color: "white",
            borderRadius: 4
          }}
        >
          <CardContent>
            <Typography variant="h5">
              📊 Analytics
            </Typography>

            <Typography mt={2} color="#94a3b8">
              Track top candidates and gain recruitment insights instantly.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* STATS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          py: 3,
          flexWrap: "wrap"
        }}
      >
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold">
            100+
          </Typography>
          <Typography color="#94a3b8">
            Resumes Analyzed
          </Typography>
        </Box>

        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold">
            95%
          </Typography>
          <Typography color="#94a3b8">
            Accuracy
          </Typography>
        </Box>

        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold">
            AI
          </Typography>
          <Typography color="#94a3b8">
            Powered
          </Typography>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          textAlign: "center",
          py: 2,
          borderTop:
            "1px solid rgba(255,255,255,0.08)",
          color: "#94a3b8"
        }}
      >
        Made with ❤️ by{" "}
        <span
          style={{
            color: "white",
            fontWeight: "bold"
          }}
        >
          Harshita Singh
        </span>
      </Box>
    </Box>
  );
}