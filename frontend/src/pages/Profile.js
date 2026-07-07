import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const INITIAL_PROFILE = {
  name: "Harshita Singh",
  role: "AI Recruiter",
  email: "harshita@gmail.com",
  phone: "+91-XXXXXXXXXX",
  skills: ["React", "Node.js", "MongoDB", "JavaScript"]
};

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [savedProfile, setSavedProfile] = useState(INITIAL_PROFILE);
  const [draftProfile, setDraftProfile] = useState(INITIAL_PROFILE);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [draftPhotoUrl, setDraftPhotoUrl] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const startEditing = () => {
    setDraftProfile(savedProfile);
    setDraftPhotoUrl(photoUrl);
    setNewSkill("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setNewSkill("");
  };

  const handleFieldChange = (field) => (e) => {
    setDraftProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePhotoClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setToast({ open: true, message: "Please choose an image file.", severity: "error" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setToast({ open: true, message: "Image must be under 5MB.", severity: "error" });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setDraftPhotoUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (draftProfile.skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setNewSkill("");
      return;
    }
    setDraftProfile((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setNewSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setDraftProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Wire this up to your real endpoint when it's ready.
      const res = await fetch("http://localhost:5000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify({ ...draftProfile, photo: draftPhotoUrl })
      });

      if (!res.ok) throw new Error("Save failed");

      setSavedProfile(draftProfile);
      setPhotoUrl(draftPhotoUrl);
      setIsEditing(false);
      setToast({ open: true, message: "Profile updated successfully.", severity: "success" });
    } catch (err) {
      // Fall back to local save so the UI still reflects changes even if the API isn't up yet.
      setSavedProfile(draftProfile);
      setPhotoUrl(draftPhotoUrl);
      setIsEditing(false);
      setToast({
        open: true,
        message: "Saved locally — couldn't reach the server.",
        severity: "warning"
      });
    } finally {
      setSaving(false);
    }
  };

  const displayed = isEditing ? draftProfile : savedProfile;
  const displayedPhoto = isEditing ? draftPhotoUrl : photoUrl;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4
      }}
    >
      <Card
        sx={{
          width: 500,
          maxWidth: "100%",
          background: "#1e293b",
          color: "white",
          borderRadius: 4,
          boxShadow: "0 0 20px rgba(0,0,0,0.4)"
        }}
      >
        <CardContent sx={{ textAlign: "center", p: 4 }}>
          <Box sx={{ position: "relative", width: 90, margin: "auto" }}>
            <Avatar
              src={displayedPhoto || undefined}
              sx={{
                width: 90,
                height: 90,
                margin: "auto",
                bgcolor: "#22c55e",
                fontSize: 35,
                fontWeight: "bold",
                cursor: isEditing ? "pointer" : "default"
              }}
              onClick={handlePhotoClick}
            >
              {!displayedPhoto && displayed.name?.charAt(0)}
            </Avatar>

            {isEditing && (
              <IconButton
                size="small"
                onClick={handlePhotoClick}
                sx={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  bgcolor: "#22c55e",
                  "&:hover": { bgcolor: "#16a34a" }
                }}
              >
                <Typography sx={{ fontSize: 14 }}>📷</Typography>
              </IconButton>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhotoChange}
            />
          </Box>

          {isEditing ? (
            <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Name"
                value={draftProfile.name}
                onChange={handleFieldChange("name")}
                size="small"
                fullWidth
                InputLabelProps={{ sx: { color: "#94a3b8" } }}
                sx={{ input: { color: "white" }, fieldset: { borderColor: "#334155" } }}
              />
              <TextField
                label="Role"
                value={draftProfile.role}
                onChange={handleFieldChange("role")}
                size="small"
                fullWidth
                InputLabelProps={{ sx: { color: "#94a3b8" } }}
                sx={{ input: { color: "white" }, fieldset: { borderColor: "#334155" } }}
              />
              <TextField
                label="Email"
                value={draftProfile.email}
                onChange={handleFieldChange("email")}
                size="small"
                fullWidth
                InputLabelProps={{ sx: { color: "#94a3b8" } }}
                sx={{ input: { color: "white" }, fieldset: { borderColor: "#334155" } }}
              />
              <TextField
                label="Phone"
                value={draftProfile.phone}
                onChange={handleFieldChange("phone")}
                size="small"
                fullWidth
                InputLabelProps={{ sx: { color: "#94a3b8" } }}
                sx={{ input: { color: "white" }, fieldset: { borderColor: "#334155" } }}
              />
            </Box>
          ) : (
            <>
              <Typography variant="h4" mt={2} fontWeight="bold">
                {displayed.name}
              </Typography>

              <Typography color="#94a3b8" mt={1}>
                {displayed.role}
              </Typography>

              <Typography mt={3}>📧 {displayed.email}</Typography>
              <Typography mt={1}>📱 {displayed.phone}</Typography>
              <Typography mt={1}>💼 Role: {displayed.role}</Typography>
            </>
          )}

          <Box mt={3} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 0.5 }}>
            {displayed.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={isEditing ? () => removeSkill(skill) : undefined}
                sx={{ m: 0.5, bgcolor: "#334155", color: "white" }}
              />
            ))}
          </Box>

          {isEditing && (
            <Box mt={2} sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <TextField
                placeholder="Add a skill"
                size="small"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                sx={{ input: { color: "white" }, fieldset: { borderColor: "#334155" } }}
              />
              <Button variant="outlined" onClick={addSkill}>
                Add
              </Button>
            </Box>
          )}

          <Box mt={4}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  disabled={saving}
                  onClick={handleSave}
                  startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>

                <Button variant="outlined" sx={{ ml: 2 }} onClick={cancelEditing} disabled={saving}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" 
                color="warning"
                sx={{ mt: 2 }}
                onClick={startEditing}>
                  Edit Profile
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  sx={{ ml: 2 }}
                  onClick={() => navigate("/dashboard")}
                >
                  Back
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}