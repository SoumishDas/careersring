"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";

export default function AdminCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [invited, setInvited] = useState("");
  const [completed, setCompleted] = useState("");

  const fetchData = async () => {
    const query = new URLSearchParams({
      page: currentPage,
      search,
      invited,
      completed,
    }).toString();
    const res = await axios.get(`/api/masterData/candidates?${query}`);
    setCandidates(res.data);
    const pagesRes = await axios.get(
      `/api/masterData/candidates/numPages?pageSize=10&search=${search}&invited=${invited}&completed=${completed}`
    );
    setTotalPages(pagesRes.data.numberOfPages);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search, invited, completed]);

  const handlePageChange = (p) => {
    setCurrentPage(p);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Invited"
          value={invited}
          onChange={(e) => setInvited(e.target.value)}
          sx={{ width: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Invited</MenuItem>
          <MenuItem value="false">Not Invited</MenuItem>
        </TextField>
        <TextField
          select
          label="Completed"
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
          sx={{ width: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Completed</MenuItem>
          <MenuItem value="false">Pending</MenuItem>
        </TextField>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
        {candidates.map((c) => (
          <Card key={c.ID} sx={{ p: 1 }}>
            <CardContent>
              <Typography variant="h6">{c.FullName}</Typography>
              <Typography variant="body2">{c.Email}</Typography>
              <Link href={`/candidate/${c.ID}`}>View</Link>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ mt: 2 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button key={p} onClick={() => handlePageChange(p)} disabled={p === currentPage}>
            {p}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
