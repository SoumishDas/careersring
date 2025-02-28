// components/MultiStepForm/Steps/Step06TellUsAboutWork.js

import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';

/** 
 * Mock data to simulate an API response. 
 * In a real app, you'd fetch these from your backend.
 */
const mockDesignations = [
  'Software Engineer',
  'Project Manager',
  'Team Lead',
  'Data Scientist',
  'Business Analyst',
  'UI/UX Designer',
  'Consultant'
];

const mockCompanies = [
  'Google',
  'Microsoft',
  'Amazon',
  'Meta',
  'IBM',
  'TCS',
  'Infosys',
  'Wipro',
];

export default function Step06TellUsAboutWork() {
  const { watch, setValue } = useFormContext();

  // Watch current values so Autocomplete can display them
  const latestDesignation = watch('latestDesignation') || '';
  const latestCompany = watch('latestCompany') || '';

  // State for the dropdown lists
  const [designations, setDesignations] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Simulate fetching data from an API
  useEffect(() => {
    setTimeout(() => {
      setDesignations(mockDesignations);
      setCompanies(mockCompanies);
    }, 300); // 300ms delay for the demo
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Tell us about work
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Enter your latest designation and company
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Autocomplete for Latest Designation */}
        <Autocomplete
          freeSolo
          options={designations}
          value={latestDesignation}
          onChange={(_, newValue) => setValue('latestDesignation', newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select your latest designation"
              // We also call setValue in onBlur to ensure typed text is captured
              onBlur={(e) => setValue('latestDesignation', e.target.value)}
            />
          )}
          sx={{ width: '100%' }}
        />

        {/* Autocomplete for Latest Company */}
        <Autocomplete
          freeSolo
          options={companies}
          value={latestCompany}
          onChange={(_, newValue) => setValue('latestCompany', newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select your latest company"
              onBlur={(e) => setValue('latestCompany', e.target.value)}
            />
          )}
          sx={{ width: '100%' }}
        />
      </Box>
    </Box>
  );
}
