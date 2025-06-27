"use client";
import {useState, useEffect} from "react";
import axios from "axios";
import Link from "next/link";
import {Box, TextField, Table, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material";

export default function AdminCandidateList() {
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/candidates?page=1&pageSize=50&search=${encodeURIComponent(search)}`);
        setCandidates(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [search]);

  return (
    <Box sx={{p:2}}>
      <TextField label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} sx={{mb:2}} fullWidth />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((c)=>(
            <TableRow key={c.ID}>
              <TableCell>{c.FullName}</TableCell>
              <TableCell>{c.Email}</TableCell>
              <TableCell>
                <Link href={`/admin/candidates/${c.ID}`} passHref>
                  <Button variant="outlined">Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
