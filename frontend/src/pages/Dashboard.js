import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  Avatar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Divider,
  ListItemIcon
} from "@mui/material";

export default function Dashboard() {
  const [topCandidates, setTopCandidates] = useState([]);
  const navigate = useNavigate();

const [profileAnchor, setProfileAnchor] = useState(null);

const openProfile = (event) => {
  setProfileAnchor(event.currentTarget);
};

const closeProfile = () => {
  setProfileAnchor(null);
};
  const [anchorEl, setAnchorEl] = useState(null);

const notifications = [
  "Resume uploaded successfully",
  "AI evaluation completed",
  "Candidate shortlisted",
  "Recruiter notes updated"
];

const openNotification = (event) => {
  setAnchorEl(event.currentTarget);
};

const closeNotification = () => {
  setAnchorEl(null);
};

  // Auth check should be a side effect, not run directly during render
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/top-candidates")
      .then((res) => res.json())
      .then((data) => setTopCandidates(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white"
      }}
    >
      {/* TOP NAVBAR */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          background: "#1e293b",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <Typography fontWeight="bold" fontSize="22px">
          AI RECRUIT HUB
        </Typography>

        <TextField
          placeholder="Search candidates..."
          size="small"
          sx={{
            width: "350px",
            background: "white",
            borderRadius: "10px"
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={openNotification}>
  <Badge badgeContent={notifications.length} color="error">
    <Typography fontSize="22px">🔔</Typography>
  </Badge>
</IconButton>

          <Avatar
  sx={{
    bgcolor: "#22c55e",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.08)",
      boxShadow: "0 0 15px #22c55e"
    }
  }}
  onClick={openProfile}
>
  H
</Avatar>

<Menu
  anchorEl={profileAnchor}
  open={Boolean(profileAnchor)}
  onClose={closeProfile}
  PaperProps={{
    sx: {
      width: 250,
      borderRadius: 3,
      mt: 1
    }
  }}
>
  <MenuItem disabled>
    <Box>
      <Typography fontWeight="bold">
        Harshita Singh
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
      >
        AI Recruiter
      </Typography>
    </Box>
  </MenuItem>

  <Divider />

  <MenuItem
  onClick={() => {
    closeProfile();
    navigate("/profile");
  }}
>
  👤 View Profile
</MenuItem>

<MenuItem onClick={() => navigate("/edit-profile")}>
  ✏️ Edit Profile
</MenuItem>

<MenuItem
  onClick={() => alert("Settings Coming Soon 🚀")}
>
  ⚙️ Settings
</MenuItem>

  <Divider />

  <MenuItem
    onClick={() =>
      alert("Settings Coming Soon 🚀")
    }
  >
    ⚙ Settings
  </MenuItem>

  <Divider />

  <MenuItem
    onClick={() => {
      localStorage.removeItem("token");
      navigate("/");
    }}
    sx={{ color: "red" }}
  >
    🚪 Logout
  </MenuItem>
</Menu>
        </Box>
      </Box>

      <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={closeNotification}
>
  <MenuItem disabled>
    <b>Notifications</b>
  </MenuItem>

  <Divider />

  {notifications.map((item, index) => (
    <MenuItem key={index}>{item}</MenuItem>
  ))}
</Menu>

      {/* MAIN LAYOUT */}
      <Box sx={{ display: "flex" }}>
        {/* SIDEBAR */}
        <Box
          sx={{
            width: "220px",
            background: "#1e293b",
            minHeight: "calc(100vh - 70px)",
            p: 3,
            borderRight: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              color: "white"
            }}
          >
            <Typography mb={3} fontWeight="bold">
              🏠 Dashboard
            </Typography>
          </Link>

          <Link
            to="/upload"
            style={{
              textDecoration: "none",
              color: "white"
            }}
          >
            <Typography mb={3}>📄 Upload Resume</Typography>
          </Link>

          <Link
            to="/candidates"
            style={{
              textDecoration: "none",
              color: "white"
            }}
          >
            <Typography mb={3}>👥 Candidates</Typography>
          </Link>

          <Link
            to="/analytics"
            style={{
              textDecoration: "none",
              color: "white"
            }}
          >
            <Typography mb={3}>📊 Analytics</Typography>
          </Link>

          <Typography
            mt={6}
            sx={{
              cursor: "pointer",
              color: "#ef4444",
              fontWeight: "bold"
            }}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            🚪 Logout
          </Typography>
        </Box>

        {/* CONTENT */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 3
          }}
        >
          {/* JOB FEED */}
          <Card
            sx={{
              background: "#1e293b",
              color: "white",
              borderRadius: 4
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                Job Feed
              </Typography>

              <Box mt={3}>
                <Typography fontWeight="bold" mb={2}>
                  Open Positions
                </Typography>

                <Typography color="#94a3b8" mb={1}>
                  • Frontend Developer
                </Typography>

                <Typography color="#94a3b8" mb={1}>
                  • Backend Developer
                </Typography>

                <Typography color="#94a3b8" mb={1}>
                  • Full Stack Developer
                </Typography>

                <Typography color="#94a3b8">• Data Analyst</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* CANDIDATE LIST */}
          <Card
            sx={{
              background: "#1e293b",
              color: "white",
              borderRadius: 4
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                ⭐ Candidate List
              </Typography>

              {topCandidates.map((candidate, index) => (
                <Box
                  key={candidate._id || index}
                  sx={{
                    mt: 2,
                    p: 2,
                    background: "#0f172a",
                    borderRadius: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-3px)"
                    }
                  }}
                >
                  <Box>
                    <Typography fontWeight="bold">
                      Candidate {index + 1}
                    </Typography>

                    <Box mt={1}>
                      {candidate.skills?.slice(0, 3).map((skill, i) => (
                        <Chip
                          key={i}
                          label={skill}
                          sx={{
                            mr: 1,
                            mt: 1,
                            background: "#334155",
                            color: "white"
                          }}
                        />
                      ))}
                    </Box>

                    <Button
                      size="small"
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() =>
                        (window.location.href = `/candidate/${candidate._id}`)
                      }
                    >
                      View Profile
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      width: "65px",
                      height: "65px",
                      borderRadius: "50%",
                      border: "4px solid #22c55e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold"
                    }}
                  >
                    {candidate.score}%
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* ANALYSIS */}
          <Card
            sx={{
              background: "#1e293b",
              color: "white",
              borderRadius: 4
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                Deep Analysis
              </Typography>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  background: "#0f172a",
                  borderRadius: "12px"
                }}
              >
                <Typography fontWeight="bold">AI Summary</Typography>

                <Typography mt={1} color="#94a3b8">
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
