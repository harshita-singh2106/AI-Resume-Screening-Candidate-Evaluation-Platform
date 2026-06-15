import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  TextField
} from "@mui/material";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/top-candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.skills
      ?.join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        p: 4
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={3}
      >
        👥 Candidates
      </Typography>

      <TextField
        fullWidth
        placeholder="Search by skill..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 4,
          background: "white",
          borderRadius: 2
        }}
      />

      {filteredCandidates.map((candidate, index) => (
        <Card
          key={index}
          sx={{
            background: "#1e293b",
            color: "white",
            mb: 3,
            borderRadius: 3
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Candidate {index + 1}
            </Typography>

            <Typography
              color="#22c55e"
              mt={1}
              mb={2}
            >
              Score: {candidate.score}%
            </Typography>

            <Box mb={2}>
              {candidate.skills?.map((skill, i) => (
                <Chip
                  key={i}
                  label={skill}
                  sx={{
                    mr: 1,
                    mb: 1,
                    background:
                      "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                    color: "white"
                  }}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              component={Link}
              to={`/candidate/${candidate._id}`}
            >
              View Profile
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}