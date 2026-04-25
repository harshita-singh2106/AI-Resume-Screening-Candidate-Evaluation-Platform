import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
  Stack,
  Chip,
  LinearProgress
} from "@mui/material";

import{
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";

export default function Dashboard() {
  if(!localStorage.getItem("token")){
    window.location.href = "/login";
  }

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [resumes, setResumes] = useState([]);


  // 👇 YAHAN ADD KARO (STEP 3)
  const statusData = [
    { name: "Pending", value: resumes.filter(r => r.status === "pending").length },
    { name: "Shortlisted", value: resumes.filter(r => r.status === "shortlisted").length },
    { name: "Rejected", value: resumes.filter(r => r.status === "rejected").length },
  ];

  const scoreData = resumes.map((r, i) => ({
    name: `C${i + 1}`,
    score: r.score
  }));

  const [loading, setLoading] = useState(true);
  const [topCandidates, setTopCandidates] = useState([]);
  const [jobSkills, setJobSkills] = useState(" ");
  const [matches, setMatches] = useState([]);

  const [analytics, setAnalytics] = useState({
    total: 0,
    average: 0,
    best: 0,
  });



  // ✅ Fetch Resumes + Analytics
  const fetchResumes = () => {

    setLoading(true);

    fetch("http://localhost:5000/resumes")
      .then(res => res.json())
      .then(data => {

        setResumes(data);

        const total = data.length;

        const average =
          total === 0
            ? 0
            : Math.round(
                data.reduce((sum, r) => sum + r.score, 0) / total
              );

        const best =
          total === 0
            ? 0
            : Math.max(...data.map(r => r.score));

        setAnalytics({ total, average, best });

        setLoading(false);
      });
  };

  const matchSkills = async () => {

  const res = await fetch("http://localhost:5000/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ skills: jobSkills.split(",").map(s => s.trim()) })
  });

  const data = await res.json();

  setMatches(data.sort((a, b) => b.matchScore - a.matchScore));

};

  // ✅ Fetch Top Candidates
  const fetchTopCandidates = () => {
    fetch("http://localhost:5000/top-candidates")
      .then(res => res.json())
      .then(data => setTopCandidates(data));
  };

  // ✅ Auto Refresh Dashboard
  useEffect(() => {

    if (search !== "") return;

    fetchResumes();
    fetchTopCandidates();

    const interval = setInterval(() => {
      fetchResumes();
      fetchTopCandidates();
    }, 10000);

    return () => clearInterval(interval);

  }, [search]);

  // ✅ Delete Resume
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/resumes/${id}`, {
      method: "DELETE",
    });

    setResumes(prev =>
      prev.filter(resume => resume._id !== id)
    );
  };

  // ✅ Update Status
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/resumes/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchResumes();
  };

  // ✅ Search
  const handleSearch = async () => {

    if (!search.trim()) return;

    const res = await fetch(
      `http://localhost:5000/search?skill=${search}`
    );

    const data = await res.json();
    setResumes(data);
  };

  // ✅ Reset
  const handleReset = () => {
    setSearch("");
    setFilter("All");
    fetchResumes();
    fetchTopCandidates();
  };

  return (
    <div style={{ 
      padding:"30px", 
      minHeight: "100vh", 
      background:"linear-gradient(135deg, #eef2f3, #dfe9f3)" 
    }}>

      {/* Analytics */}
      <Grid container spacing={3} mb={3}>

        <Grid item xs={12} md={4}>
          <Card sx = {{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Total Resumes</Typography>
              <Typography variant="h4">{analytics.total}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx = {{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Average Score</Typography>
              <Typography variant="h4">{analytics.average}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx = {{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Best Candidate</Typography>
              <Typography variant="h4">{analytics.best}%</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* Top Candidates */}
      <Typography variant="h5" mb={2}>
        ⭐ Top Candidates
      </Typography>

      

      {topCandidates.map(candidate => (
        <Card key={candidate._id} sx={{ mb:2 }}>
          <CardContent>
            <Typography>Score: {candidate.score}%</Typography>
            <Typography>
              Skills: {candidate.skills.join(", ")}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Box mt={4}>
  <Typography variant="h5" mb={2}>
    Analytics
  </Typography>

  <Box display="flex" gap={5} flexWrap="wrap">

    {/* Bar Chart */}
    <BarChart width={400} height={300} data={scoreData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="score" fill="#1976d2" />
    </BarChart>

    {/* Pie Chart */}
    <PieChart width={400} height={300}>
      <Pie
        data={statusData}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      >
        {statusData.map((entry, index) => (
          <Cell
            key={index}
            fill={["#ff9800", "#4caf50", "#f44336"][index]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>

  </Box>
</Box>

      <Typography variant="h5" mt={4} mb={2}>
  Job Skill Matching
</Typography>

<TextField
  fullWidth
  label="Enter Job Skills (comma separated)"
  value={jobSkills}
  onChange={(e) => setJobSkills(e.target.value)}
/>

<Button
  variant="contained"
  sx={{ mt: 2, mb: 3 }}
  onClick={matchSkills}
>
  Match Candidates
</Button>

      {/* Search */}
      <Typography variant="h5" mt={4} mb={2}>
        All Uploaded Resumes
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search Candidate Skill"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          onKeyDown={(e)=> e.key==="Enter" && handleSearch()}
          fullWidth
        />

        <Button variant="contained" sx = {{borderRadius: "10px", textTransform: "none"}} onClick={handleSearch}>
          Search
        </Button>

        <Button variant="outlined" sx = {{borderRadius: "10px", textTransform: "none"}} onClick={handleReset}>
          Reset
        </Button>
      </Box>

      {/* ✅ FILTER BUTTONS */}
      <Box mb={3}>
        <Typography variant="h6" mb={1}>
          Filter Candidates
        </Typography>

        <Button variant="contained" onClick={()=>setFilter("All")}>
          All
        </Button>

        <Button color="warning" sx={{ml:1}}
          onClick={()=>setFilter("Pending")}>
          Pending
        </Button>

        <Button color="success" sx={{ml:1}}
          onClick={()=>setFilter("Shortlisted")}>
          Shortlisted
        </Button>

        <Button color="error" sx={{ml:1}}
          onClick={()=>setFilter("Rejected")}>
          Rejected
        </Button>
      </Box>

      {matches.length > 0 && (
  <Box mt={3} mb={3}>

    <Typography variant="h6" mb={2}>
      Skill Match Results
    </Typography>

{matches.map((m, index) => (
  <Card
    key={index}
    sx={{
      p: 2,
      mb: 2,
      borderRadius: 3,
      boxShadow:
        index === 0
          ? "0 8px 25px rgba(255,215,0,0.5)"
          : index === 1
          ? "0 8px 25px rgba(192,192,192,0.5)"
          : index === 2
          ? "0 8px 25px rgba(205,127,50,0.5)"
          : "0 6px 15px rgba(0,0,0,0.08)",
      border:
        index === 0
          ? "2px solid gold"
          : index === 1
          ? "2px solid silver"
          : index === 2
          ? "2px solid #cd7f32"
          : "none"
    }}
  >
    <CardContent>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        #{index + 1} Candidate
      </Typography>

      <Typography fontSize = "20px">
        {index === 0 && "🏆 Best Match"}
        {index === 1 && "🥈 Second Best"}
        {index === 2 && "🥉 Third Best"}
      </Typography>

      <Typography variant="h6" fontWeight="bold">
        Match Score: {m.matchScore}%
      </Typography>

      <LinearProgress
        variant="determinate"
        value={m.matchScore}
        sx={{
          height: 10,
          borderRadius: 5,
          my: 2
        }}
      />

      <Typography fontWeight="bold">Matched Skills:</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
        {m.matchedSkills.map((s, idx) => (
          <Chip key={idx} label={s} color="success" />
        ))}
      </Stack>

      <Typography fontWeight="bold">Missing Skills:</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {m.missingSkills.map((s, idx) => (
          <Chip key={idx} label={s} color="error" />
        ))}
      </Stack>

    </CardContent>
  </Card>
))}

  </Box>
)}

      {/* Resume Cards */}
      {loading ? (
        <Typography variant="h6">
          Loading candidates...
        </Typography>
      ) : (
        resumes
          .filter(resume =>
            filter === "All"
              ? true
              : (resume.status || "Pending") === filter
          )
          .map(resume => (

            <Card
              key={resume._id}
              sx={{
                mb: 3,
                borderRadius: 4,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                }
              }}
>
              <CardContent>

                <Chip
                  label={resume.status || "Pending"}
                  color={
                    resume.status === "Shortlisted"
                      ? "success"
                      : resume.status === "Rejected"
                      ? "error"
                      : "warning"
                  }
                  sx={{ mb:1 }}
                />

                <Typography variant="h6" fontWeight="bold">
                  Resume Score: {resume.score}%
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={2}
                >
                  Uploaded on{" "}
                  {new Date(resume.createdAt).toLocaleString()}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {resume.skills.map((skill,index)=>(
                    <Chip
                      key={index}
                      label={skill}
                      sx={{
                        background: "#e3f2fd",
                        color: "#1976d2",
                        fontWeight: 500,
                        borderRadius: "8px",
                        px: 1,
                        "&:hover": {
                          background: "#bbdefb",
                          transform: "scale(1.05)",
                        }
                      }}
                    />

                  ))}
                </Stack>

                <Button
                  color="error"
                  variant="contained"
                  sx={{ mt:2 }}
                  onClick={()=>handleDelete(resume._id)}
                >
                  Delete
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt:2, ml:1 }}
                  onClick={()=>updateStatus(resume._id,"Shortlisted")}
                >
                  Shortlist
                </Button>

                <Button
                  variant="contained"
                  color="warning"
                  sx={{ mt:2, ml:1 }}
                  onClick={()=>updateStatus(resume._id,"Rejected")}
                >
                  Reject
                </Button>

                <Button
  variant="outlined"
  sx={{ mt: 2, ml: 1 }}
  onClick={() =>
    window.location.href = `/candidate/${resume._id}`
  }
>
  View Profile
</Button>

              </CardContent>
            </Card>

          ))
      )}

    </div>
  );
}