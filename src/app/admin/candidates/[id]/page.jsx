"use client";
import {useState, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Box, TextField, Button} from "@mui/material";

export default function EditCandidate({params}) {
  const {id} = params;
  const [candidate, setCandidate] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    axios.get(`/api/masterData/candidates/${id}`)
      .then(res => setCandidate(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (field) => (e) => {
    setCandidate({...candidate, [field]: e.target.value});
  };

  const handleSave = async () => {
    if(!candidate) return;
    const payload = {...candidate, EmailUID: candidate.EmailUID};
    try {
      await axios.put(`/api/masterData/candidates/${id}`, payload);
      router.back();
    } catch (err) {
      console.error(err);
    }
  };

  if(!candidate) return <p>Loading...</p>;

  return (
    <Box sx={{p:2, maxWidth:600}}>
      <TextField fullWidth label="Full Name" value={candidate.FullName || ''} onChange={handleChange('FullName')} sx={{mb:2}} />
      <TextField fullWidth label="Email" value={candidate.Email || ''} onChange={handleChange('Email')} sx={{mb:2}} />
      <TextField fullWidth label="Mobile" value={candidate.MobileNumber || ''} onChange={handleChange('MobileNumber')} sx={{mb:2}} />
      <TextField fullWidth label="Current Location" value={candidate.CurrentLocation || ''} onChange={handleChange('CurrentLocation')} sx={{mb:2}} />
      <Button variant="contained" onClick={handleSave}>Save</Button>
    </Box>
  );
}
