import { useState } from "react";
import axios from "axios";
import {
Box,
Typography,
Button,
Card,
CardContent,
Chip,
CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

function ResumeUpload() {
const [file, setFile] = useState(null);
const [resumeText, setResumeText] = useState("");
const [skills, setSkills] = useState([]);
const [score, setScore] = useState(null);
const [missingSkills, setMissingSkills] = useState([]);
const [loading, setLoading] = useState(false);

const handleFileChange = (e) => {
setFile(e.target.files[0]);
setResumeText("");
setSkills([]);
setScore(null);
setMissingSkills([]);
};

const handleSubmit = async (e) => {
e.preventDefault();

if (!file) {
  alert("Please select a resume first");
  return;
}

const formData = new FormData();
formData.append("resume", file);

try {
  setLoading(true);

  const res = await axios.post(
    "http://localhost:5000/upload",
    formData
  );

  setResumeText(res.data.extractedText || "");
  setSkills(res.data.skills || []);
  setScore(res.data.score || null);
  setMissingSkills(res.data.missingSkills || []);

  alert("Resume uploaded successfully!");
} catch (error) {
  console.error(error);
  alert("Upload failed. Backend not responding.");
} finally {
  setLoading(false);
}

};

return (
<Box
sx={{
minHeight: "100vh",
background: "radial-gradient(circle at top, #1e293b, #020617)",
color: "white",
display: "flex",
flexDirection: "column",
}}
>
{/* HEADER */}
<Box
sx={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
px: 4,
py: 3,
borderBottom: "1px solid rgba(255,255,255,0.08)",
}}
>
<Typography
fontSize="28px"
fontWeight="bold"
sx={{
background:
"linear-gradient(to right,#38bdf8,#818cf8)",
WebkitBackgroundClip: "text",
WebkitTextFillColor: "transparent",
}}
>
AI RECRUIT HUB
</Typography>

    <Link
      to="/dashboard"
      style={{ textDecoration: "none" }}
    >
      <Button
        variant="contained"
        sx={{
          borderRadius: "12px",
          background:
            "linear-gradient(to right,#3b82f6,#6366f1)",
        }}
      >
        🏠 Dashboard
      </Button>
    </Link>
  </Box>

  <Box sx={{ 
    p: 4,
    flex: 1,
     }}>
    <Typography variant="h3" fontWeight="bold">
      📄 Upload Resume
    </Typography>

    <Typography color="#94a3b8" mb={4}>
      Upload a candidate resume and get AI-powered
      evaluation instantly.
    </Typography>

    {/* UPLOAD CARD */}
    <Card
      sx={{
        background: "#1e293b",
        color: "white",
        borderRadius: 4,
        mb: 4,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
        >
          📄 Upload Candidate Resume
        </Typography>

        <Typography
          color="#94a3b8"
          mb={3}
        >
          Supported formats: PDF, DOC, DOCX
        </Typography>

        <form onSubmit={handleSubmit}>
          <input
  accept=".pdf,.doc,.docx"
  id="resume-upload"
  type="file"
  hidden
  onChange={handleFileChange}
/>

<label htmlFor="resume-upload">
  <Button
    variant="outlined"
    component="span"
    sx={{
      borderColor: "#3b82f6",
      color: "#60a5fa",
      borderRadius: "12px",
      px: 3,
    }}
  >
    📂 Browse Resume
  </Button>
</label>

         {file ? (
  <Typography
    mt={2}
    sx={{
      color: "#22c55e",
      fontWeight: "bold",
    }}
  >
    ✅ {file.name}
  </Typography>
) : (
  <Typography
    mt={2}
    color="#94a3b8"
  >
    PDF, DOC, DOCX supported
  </Typography>
)}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              ml: 2,
              background:
                "linear-gradient(to right,#06b6d4,#3b82f6)",
            }}
          >
            {loading ? (
              <CircularProgress
                size={20}
                color="inherit"
              />
            ) : (
              "Upload Resume"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>

    {/* SCORE */}
    {score !== null && (
      <Card
        sx={{
          background: "#1e293b",
          color: "white",
          borderRadius: 4,
          mb: 4,
        }}
      >
        <CardContent>
          <Typography variant="h5">
            🎯 Resume Score
          </Typography>

          <Typography
            variant="h2"
            color="#22c55e"
            fontWeight="bold"
            textAlign="center"
          >
            {score}%
          </Typography>
        </CardContent>
      </Card>
    )}

    {/* SKILLS */}
    {skills.length > 0 && (
      <Card
        sx={{
          background: "#1e293b",
          color: "white",
          borderRadius: 4,
          mb: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            mb={2}
          >
            🚀 Detected Skills
          </Typography>

          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              sx={{
                mr: 1,
                mb: 1,
                background:
                  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                color: "white",
              }}
            />
          ))}
        </CardContent>
      </Card>
    )}

    {/* MISSING SKILLS */}
    {missingSkills.length > 0 && (
      <Card
        sx={{
          background: "#1e293b",
          color: "white",
          borderRadius: 4,
          mb: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            mb={2}
          >
            ⚠ Missing Skills
          </Typography>

          {missingSkills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              color="warning"
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </CardContent>
      </Card>
    )}

    {/* RESUME PREVIEW */}
    {resumeText && (
      <Card
        sx={{
          background: "#1e293b",
          color: "white",
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            mb={2}
          >
            📑 Resume Preview
          </Typography>

          <Box
            sx={{
              background: "#0f172a",
              p: 3,
              borderRadius: 3,
              maxHeight: "350px",
              overflowY: "auto",
            }}
          >
            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                color: "#cbd5e1",
                lineHeight: 1.8,
              }}
            >
              {resumeText}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    )}
  </Box>

  {/* FOOTER */}
  <Box
    sx={{
      textAlign: "center",
      py: 3,
      mt: 5,
      color: "#94a3b8",
      borderTop:
        "1px solid rgba(255,255,255,0.08)",
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

export default ResumeUpload;