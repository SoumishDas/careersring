import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';

const mockJobTitles = [
  'CEO',
  'Consultant',
  'Software Engineer',
  'Project Manager',
  'Business Analyst',
  'UI/UX Designer'
];

export default function Step17JobTitles() {
  const { watch, setValue } = useFormContext();
  const selectedJobs = watch('jobTitles') || [];
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAllJobs(mockJobTitles);
    }, 300);
  }, []);

  const handleChange = (_, newVal) => {
    if (newVal.length <= 2) {
      setValue('jobTitles', newVal);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What are your preferred job titles?
      </Typography>
      <Typography variant="body2" color="textSecondary">
        You can select max 2
      </Typography>

      <Autocomplete
        multiple
        options={allJobs}
        value={selectedJobs}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} label="Enter your preferred job titles" />}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
