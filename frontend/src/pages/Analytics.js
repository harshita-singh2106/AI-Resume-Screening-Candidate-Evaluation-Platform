import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function Analytics() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/top-candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.log(err));
  }, []);

  const totalCandidates = candidates.length;

  const averageScore =
    totalCandidates > 0
      ? Math.round(
          candidates.reduce(
            (sum, c) => sum + c.score,
            0
          ) / totalCandidates
        )
      : 0;

  const highestScore =
    totalCandidates > 0
      ? Math.max(
          ...candidates.map((c) => c.score)
        )
      : 0;

  const skillMap = {};

  candidates.forEach((candidate) => {
    candidate.skills?.forEach((skill) => {
      skillMap[skill] =
        (skillMap[skill] || 0) + 1;
    });
  });

  const skillsData = Object.keys(skillMap).map(
    (skill) => ({
      name: skill,
      count: skillMap[skill]
    })
  );

  const scoreData = candidates.map(
    (candidate, index) => ({
      name: `C${index + 1}`,
      score: candidate.score
    })
  );

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#22c55e",
    "#f59e0b",
    "#ef4444"
  ];

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
        mb={4}
      >
        📊 Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: "#1e293b", color: "white" }}>
            <CardContent>
              <Typography>Total Candidates</Typography>
              <Typography variant="h3">
                {totalCandidates}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ background: "#1e293b", color: "white" }}>
            <CardContent>
              <Typography>Average Score</Typography>
              <Typography variant="h3">
                {averageScore}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ background: "#1e293b", color: "white" }}>
            <CardContent>
              <Typography>Highest Score</Typography>
              <Typography variant="h3">
                {highestScore}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Card
          sx={{
            background: "#1e293b",
            p: 3
          }}
        >
          <Typography
            variant="h5"
            mb={3}
            color="white"
          >
            Resume Scores
          </Typography>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={scoreData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="score"
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Box>

      <Box mt={5}>
        <Card
          sx={{
            background: "#1e293b",
            p: 3
          }}
        >
          <Typography
            variant="h5"
            mb={3}
            color="white"
          >
            Skills Distribution
          </Typography>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <PieChart>
              <Pie
                data={skillsData}
                dataKey="count"
                nameKey="name"
                outerRadius={120}
                label
              >
                {skillsData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Box>
    </Box>
  );
}