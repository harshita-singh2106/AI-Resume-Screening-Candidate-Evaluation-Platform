import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  Avatar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";

export default function Dashboard() {
  const [topCandidates, setTopCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [profileAnchor, setProfileAnchor] = useState(null);
  const openProfile = (event) => setProfileAnchor(event.currentTarget);
  const closeProfile = () => setProfileAnchor(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const openNotification = (event) => setAnchorEl(event.currentTarget);
  const closeNotification = () => setAnchorEl(null);

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const requestLogout = () => {
    // Close whichever menu triggered this before showing the dialog
    closeProfile();
    setLogoutDialogOpen(true);
  };
  const cancelLogout = () => setLogoutDialogOpen(false);
  const confirmLogout = () => {
    localStorage.removeItem("token");
    setLogoutDialogOpen(false);
    navigate("/");
  };

  const notifications = [
    "Resume uploaded successfully",
    "AI evaluation completed",
    "Candidate shortlisted",
    "Recruiter notes updated"
  ];

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

  const filteredCandidates = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return topCandidates;
    return topCandidates.filter((candidate) => {
      const skillMatch = candidate.skills?.some((skill) =>
        skill.toLowerCase().includes(term)
      );
      const nameMatch = candidate.name?.toLowerCase().includes(term);
      return skillMatch || nameMatch;
    });
  }, [topCandidates, searchTerm]);

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
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
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
          placeholder="Search candidates by name or skill..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography fontSize="16px">🔍</Typography>
              </InputAdornment>
            )
          }}
          sx={{
            width: { xs: "100%", sm: "300px", md: "350px" },
            background: "white",
            borderRadius: "10px",
            "& fieldset": { border: "none" }
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
                <Typography fontWeight="bold">Harshita Singh</Typography>
                <Typography variant="body2" color="text.secondary">
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

            <MenuItem
              onClick={() => {
                closeProfile();
                navigate("/profile");
              }}
            >
              ✏️ Edit Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                closeProfile();
                alert("Settings Coming Soon 🚀");
              }}
            >
              ⚙️ Settings
            </MenuItem>

            <Divider />

            <MenuItem onClick={requestLogout} sx={{ color: "red" }}>
              🚪 Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeNotification}>
        <MenuItem disabled>
          <b>Notifications</b>
        </MenuItem>

        <Divider />

        {notifications.length === 0 ? (
          <MenuItem disabled>You're all caught up</MenuItem>
        ) : (
          notifications.map((item, index) => (
            <MenuItem key={index} onClick={closeNotification}>
              {item}
            </MenuItem>
          ))
        )}
      </Menu>

      {/* LOGOUT CONFIRMATION DIALOG */}
      <Dialog open={logoutDialogOpen} onClose={cancelLogout}>
        <DialogTitle>Log out?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You'll need to sign in again to access your dashboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout}>Cancel</Button>
          <Button onClick={confirmLogout} color="error" variant="contained">
            Log out
          </Button>
        </DialogActions>
      </Dialog>

      {/* MAIN LAYOUT */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {/* SIDEBAR */}
        <Box
          sx={{
            width: { xs: "100%", md: "220px" },
            background: "#1e293b",
            minHeight: { md: "calc(100vh - 70px)" },
            p: 3,
            borderRight: { md: "1px solid rgba(255,255,255,0.08)" },
            borderBottom: { xs: "1px solid rgba(255,255,255,0.08)", md: "none" },
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            flexWrap: "wrap",
            gap: { xs: 2, md: 0 }
          }}
        >
          <Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>
            <Typography mb={{ xs: 0, md: 3 }} fontWeight="bold">
              🏠 Dashboard
            </Typography>
          </Link>

          <Link to="/upload" style={{ textDecoration: "none", color: "white" }}>
            <Typography mb={{ xs: 0, md: 3 }}>📄 Upload Resume</Typography>
          </Link>

          <Link to="/candidates" style={{ textDecoration: "none", color: "white" }}>
            <Typography mb={{ xs: 0, md: 3 }}>👥 Candidates</Typography>
          </Link>

          <Link to="/analytics" style={{ textDecoration: "none", color: "white" }}>
            <Typography mb={{ xs: 0, md: 3 }}>📊 Analytics</Typography>
          </Link>

          <Typography
            mt={{ xs: 0, md: 6 }}
            sx={{
              cursor: "pointer",
              color: "#ef4444",
              fontWeight: "bold"
            }}
            onClick={requestLogout}
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
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" },
            gap: 3
          }}
        >
          {/* JOB FEED */}
          <Card
            sx={{
              background: "#1e293b",
              color: "white",
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                💼 Job Feed
              </Typography>

              <Box mt={3}>
                <Typography fontWeight="bold" mb={2}>
                  Open Positions
                </Typography>

                {["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst"].map(
                  (role) => (
                    <Typography key={role} color="#94a3b8" mb={1}>
                      • {role}
                    </Typography>
                  )
                )}
              </Box>
            </CardContent>
          </Card>

          {/* CANDIDATE LIST */}
          <Card
            sx={{
              background: "#1e293b",
              color: "white",
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                ⭐ Candidate List
              </Typography>

              {filteredCandidates.length === 0 ? (
                <Typography mt={3} color="#94a3b8">
                  {searchTerm
                    ? `No candidates match "${searchTerm}".`
                    : "No candidates yet — upload a resume to get started."}
                </Typography>
              ) : (
                filteredCandidates.map((candidate, index) => (
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
                      gap: 2,
                      flexWrap: "wrap",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 18px rgba(34,197,94,0.15)"
                      }
                    }}
                  >
                    <Box>
                      <Typography fontWeight="bold">
                        {candidate.name || `Candidate ${index + 1}`}
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
                        onClick={() => navigate(`/candidate/${candidate._id}`)}
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
                        fontWeight: "bold",
                        flexShrink: 0
                      }}
                    >
                      {candidate.score}%
                    </Box>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>

          {/* ANALYSIS */}
          <Card
            sx={{
              background: "#1e293b",
              color: "white",
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                🧠 Deep Analysis
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