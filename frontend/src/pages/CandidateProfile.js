import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  // Fetch Candidate
  useEffect(() => {
    fetch(`http://localhost:5000/resumes/${id}`)
      .then(res => res.json())
      .then(data => {
        setCandidate(data);
        setNotes(data.notes || "");
      });
  }, [id]);

  if (!candidate) {
    return <Typography sx={{ p:3 }}>Loading profile...</Typography>;
  }

  return (
    <Box sx={{ padding: "30px", background:"#f4f6f8", minHeight:"100vh" }}>

      <Card>
        <CardContent>

          {/* Title */}
          <Typography variant="h4" mb={2}>
            Candidate Profile
          </Typography>

          {/* Status */}
          <Chip
            label={candidate.status || "Pending"}
            color={
              candidate.status === "Shortlisted"
                ? "success"
                : candidate.status === "Rejected"
                ? "error"
                : "warning"
            }
            sx={{ mb:2 }}
          />

          {/* Score */}
          <Typography variant="h6">
            Resume Score: {candidate.score}%
          </Typography>

          {/* Date */}
          <Typography color="text.secondary" mb={3}>
            Uploaded: {new Date(candidate.createdAt).toLocaleString()}
          </Typography>

          {/* Skills */}
          <Typography variant="h6" mb={1}>
            Skills
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
            {candidate.skills.map((skill, i) => (
              <Chip key={i} label={skill} />
            ))}
          </Stack>

          {/* Notes Section */}
<Typography variant="h6" mt={3} mb={1}>
  Recruiter Notes
</Typography>

<TextField
  fullWidth
  multiline
  rows={4}
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  placeholder="Write recruiter notes here..."
/>

<Button
  variant="contained"
  sx={{ mt: 2 }}
  onClick={saveNotes}
>
  Save Notes
</Button>

          {/* Resume Viewer */}
          <Typography variant="h6" mt={3}>
            Resume PDF
          </Typography>

          <iframe
            src={`http://localhost:5000/uploads/${candidate.file}#toolbar=1`}
            width="100%"
            height="650px"
            title="Resume Viewer"
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px"
            }}
          />

          {/* Resume Text */}
          <Typography mt={3}>
            <b>Resume Text Preview:</b>
          </Typography>

          <Typography>
            {candidate.text.substring(0, 800)}...
          </Typography>

        </CardContent>
      </Card>

    </Box>
  );
}