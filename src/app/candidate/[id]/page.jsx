"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

export default function CandidateDetail({ params }) {
  const { id } = params;
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/masterData/candidates/${id}`)
      .then((res) => setCandidate(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!candidate) return <p>Loading...</p>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {candidate.FullName}
      </Typography>
      <Typography>Email: {candidate.Email}</Typography>
      <Typography>Location: {candidate.CurrentLocation}</Typography>
      {/* More fields can be displayed here */}
    </Box>
  );
}
