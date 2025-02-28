import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';

const mockIndustries = [
  'Ad Retargeting',
  'Machine Learning',
  'E-commerce',
  'Finance',
  'Healthcare',
  'Education',
  'IT Services'
];

export default function Step12LatestIndustry() {
  const { watch, setValue } = useFormContext();
  const selectedIndustries = watch('industries') || [];
  const [industryList, setIndustryList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIndustryList(mockIndustries);
    }, 300);
  }, []);

  const handleChange = (_, newVal) => {
    if (newVal.length <= 2) {
      setValue('industries', newVal);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What’s your latest industry?
      </Typography>
      <Typography variant="body2" color="textSecondary">
        You can select max 2
      </Typography>

      <Autocomplete
        multiple
        options={industryList}
        value={selectedIndustries}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Enter your industry" />
        )}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
