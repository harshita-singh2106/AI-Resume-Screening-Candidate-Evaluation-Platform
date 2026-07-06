const path = require("path");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const Resume = require("./models/Resume");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

/* =========================
   CONFIG
========================= */

// Never hardcode secrets in source. Use an env var with a fallback only for local dev.
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const UPLOAD_DIR = path.join(__dirname, "uploads");

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());

const users = [
  {
    email: "test@gmail.com",
    password: bcrypt.hashSync("1234", 10)
  }
];

/* Show PDF inside browser (not download) */
// Use an absolute path so this works no matter what directory the process is started from
app.use("/uploads", express.static(UPLOAD_DIR));

/* =========================
   DATABASE CONNECTION
========================= */

mongoose
  .connect("mongodb://127.0.0.1:27017/resumeDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* =========================
   FILE UPLOAD CONFIG
========================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  },
});

// Restrict uploads to PDFs only, since the rest of the pipeline assumes PDF content
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

/* =========================
   UPLOAD RESUME + AI ANALYSIS
========================= */

app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);

    const resumeText = data.text.toLowerCase();

    const skillsList = [
      "python",
      "java",
      "react",
      "node",
      "mongodb",
      "sql",
      "machine learning",
      "html",
      "css",
      "javascript",
    ];

    /* Detect Skills */
    const detectedSkills = skillsList.filter((skill) =>
      resumeText.includes(skill)
    );

    /* Score Calculation */
    const score = Math.round(
      (detectedSkills.length / skillsList.length) * 100
    );

    /* Missing Skills */
    const missingSkills = skillsList.filter(
      (skill) => !detectedSkills.includes(skill)
    );

    /* Save Resume */
    await Resume.create({
      text: resumeText,
      skills: detectedSkills,
      score: score,
      file: req.file.filename,
      status: "Pending",
      notes: "",
    });

    res.json({
      message: "Resume uploaded successfully",
      extractedText: resumeText.substring(0, 1000),
      skills: detectedSkills,
      score: score,
      missingSkills: missingSkills,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error parsing resume" });
  }
});

/* =========================
   GET ALL RESUMES
========================= */

app.get("/resumes", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch {
    res.status(500).json({ message: "Error fetching resumes" });
  }
});

/* =========================
   GET SINGLE CANDIDATE
========================= */

app.get("/resumes/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json(resume);
  } catch {
    res.status(500).json({ message: "Candidate fetch error" });
  }
});

/* =========================
   DELETE RESUME
========================= */

app.delete("/resumes/:id", async (req, res) => {
  try {
    const deleted = await Resume.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json({ message: "Resume deleted successfully" });
  } catch {
    res.status(500).json({ message: "Error deleting resume" });
  }
});

/* =========================
   SEARCH BY SKILL
========================= */

app.get("/search", async (req, res) => {
  try {
    const skill = req.query.skill;

    if (!skill) {
      return res.status(400).json({ message: "skill query parameter is required" });
    }

    const resumes = await Resume.find({
      skills: { $regex: skill, $options: "i" },
    });

    res.json(resumes);
  } catch {
    res.status(500).json({ message: "Search error" });
  }
});

/* =========================
   TOP CANDIDATES
========================= */

app.get("/top-candidates", async (req, res) => {
  try {
    const resumes = await Resume.find()
      .sort({ score: -1 })
      .limit(5);

    res.json(resumes);
  } catch {
    res.status(500).json({ message: "Error fetching candidates" });
  }
});

// JOB SKILL MATCHING API
app.post("/match", async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: "skills array is required" });
    }

    const inputSkills = skills.map(s => s.toLowerCase());

    const resumes = await Resume.find();

    const results = resumes.map(candidate => {

      const candidateSkills = (candidate.skills || []).map(s => s.toLowerCase());

      const matched = candidateSkills.filter(skill =>
        inputSkills.includes(skill)
      );

      const missing = inputSkills.filter(skill =>
        !candidateSkills.includes(skill)
      );

      const matchScore = Math.round(
        (matched.length / inputSkills.length) * 100
      );

      return {
        ...candidate._doc,
        matchScore,
        matchedSkills: matched,
        missingSkills: missing,
      };
    });

    // sort best first
    results.sort((a, b) => b.matchScore - a.matchScore);

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Matching failed" });
  }
});

/* =========================
   UPDATE NOTES
========================= */

app.put("/resumes/:id/notes", async (req, res) => {
  try {
    const { notes } = req.body;

    const updated = await Resume.findByIdAndUpdate(
      req.params.id,
      { notes },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Notes update failed" });
  }
});

app.post("/ai-feedback", (req, res) => {
  const { skills, score } = req.body;

  const safeSkills = Array.isArray(skills) ? skills : [];
  const safeScore = typeof score === "number" ? score : 0;

  let feedback = "";

  if (safeScore > 80) {
    feedback = "Strong candidate with relevant skills.";
  } else if (safeScore > 50) {
    feedback = "Average candidate, can improve in some areas.";
  } else {
    feedback = "Weak profile, missing important skills.";
  }

  res.json({
    feedback,
    strengths: safeSkills.slice(0, 3),
    weaknesses: ["Add more projects", "Improve skill depth"]
  });
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

/* =========================
   SERVER START
========================= */

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
