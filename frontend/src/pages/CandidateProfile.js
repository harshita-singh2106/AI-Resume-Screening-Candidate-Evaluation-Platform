import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  TextField,
  Button
} from "@mui/material";

export default function CandidateProfile() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [notes, setNotes] = useState("");
  const [aiData, setAiData] = useState(null);

  const saveNotes = async () => {
    await fetch(`http://localhost:5000/resumes/${id}/notes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes }),
    });

    alert("Notes saved successfully");
  };

  const getAI = async () => {
    const res = await fetch("http://localhost:5000/ai-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skills: candidate.skills,
        score: candidate.score,
      }),
    });

    const data = await res.json();
    setAiData(data);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/resumes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCandidate(data);
        setNotes(data.notes || "");
      });
  }, [id]);

  if (!candidate) {
    return (
      <Box
        sx={{
          background: "#0f172a",
          minHeight: "100vh",
          color: "white",
          p: 4,
        }}
      >
        Loading Candidate...
      </Box>
    );
  }

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000/uploads/${candidate.file}`;
    link.setAttribute("download", candidate.file);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Box
      sx={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        p: 4,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            👤 Candidate Profile Dashboard
          </Typography>

          <Typography color="#94a3b8" mt={1}>
            AI powered candidate evaluation report
          </Typography>
          <Typography
  variant="h5"
  fontWeight="bold"
  mt={3}
>
  Harshita Singh
</Typography>

<Typography color="#94a3b8">
  Full Stack Developer Candidate
</Typography>
        </Box>

        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Button variant="contained">
            Back to Dashboard
          </Button>
        </Link>
      </Box>

      <Card
        sx={{
          background: "#1e293b",
          color: "white",
          borderRadius: 4,
        }}
      >
        <CardContent>
          {/* Top Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <Box>
              <Chip
                label={candidate.status || "Pending"}
                color={
                  candidate.status === "Shortlisted"
                    ? "success"
                    : candidate.status === "Rejected"
                    ? "error"
                    : "warning"
                }
              />

              <Typography mt={3} variant="h5">
                Resume Score
              </Typography>

              <Typography
                variant="h3"
                fontWeight="bold"
                color="#22c55e"
              >
                {candidate.score}%
              </Typography>

              <Typography color="#94a3b8" mt={1}>
                Uploaded:{" "}
                {new Date(candidate.createdAt).toLocaleString()}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                border: "8px solid #22c55e",
                boxShadow: "0 0 25px rgba(34,197,94,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {candidate.score}%
            </Box>
          </Box>

          {/* Skills */}
          <Typography
            variant="h5"
            mt={5}
            mb={2}
            fontWeight="bold"
          >
            Skills
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {candidate.skills.map((skill, i) => (
              <Chip
                key={i}
                label={skill}
                sx={{
                  background:
                    "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                  color: "white",
                  fontWeight: "bold",
                  mb: 1
                }}
              />
            ))}
          </Stack>

          <Box
  sx={{
    display: "flex",
    gap: 2,
    mt: 4,
    flexWrap: "wrap"
  }}
>
  <Chip
    label={`${candidate.skills.length} Skills Found`}
    color="primary"
  />

  <Chip
    label={candidate.status || "Pending"}
    color="success"
  />

  <Chip
    label="AI Evaluated"
    color="secondary"
  />
</Box>

          {/* Notes */}
          <Typography
            variant="h5"
            mt={5}
            mb={2}
            fontWeight="bold"
          >
            Recruiter Notes
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{
              background: "white",
              borderRadius: 2,
            }}
          />

          <Box mt={2}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={saveNotes}
            >
              💾 Save Notes
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={getAI}
            >
              🤖 AI Feedback
            </Button>
          </Box>

          {/* AI Feedback */}
          {aiData && (
            <Card
              sx={{
                mt: 4,
                background: "#0f172a",
                color: "white",
                border: "1px solid #22c55e"
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                >
                  🤖 AI Feedback
                </Typography>

                <Typography mt={2}>
                  {aiData.feedback}
                </Typography>

                <Typography mt={2}>
                  <b>Strengths:</b>{" "}
                  {aiData.strengths.join(", ")}
                </Typography>

                <Typography mt={1}>
                  <b>Weaknesses:</b>{" "}
                  {aiData.weaknesses.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Resume File */}
          <Typography
            variant="h5"
            mt={5}
            mb={2}
            fontWeight="bold"
          >
            📄 Resume File
          </Typography>

          <Card
            sx={{
              background: "#0f172a",
              color: "white",
              p: 3,
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="#94a3b8"
                >
                  Uploaded Resume
                </Typography>

                <Typography
                  fontWeight="bold"
                  mt={1}
                >
                  {candidate?.file}
                </Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  component="a"
                  href={`http://localhost:5000/uploads/${candidate?.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Resume
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  onClick={downloadResume}
                >
                  Download
                </Button>
              </Stack>
            </Box>
          </Card>

          {/* Resume Preview */}
          <Typography
            variant="h5"
            mt={5}
            mb={2}
            fontWeight="bold"
          >
            📑 Resume Preview
          </Typography>

          <Box
            sx={{
              background: "#0f172a",
              p: 3,
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.1)",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            <Typography
              sx={{
                color: "#cbd5e1",
                whiteSpace: "pre-wrap",
                lineHeight: 1.8,
                fontSize: "15px",
              }}
            >
              {candidate?.text}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Box
  sx={{
    textAlign: "center",
    mt: 5,
    pb: 3,
    color: "#94a3b8",
    fontSize: "14px"
  }}
>
  Made with ❤️ by Harshita Singh
</Box>
    </Box>
  );
}