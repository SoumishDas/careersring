import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField, Button } from '@mui/material';

const mockUniversities = [
  'Savitribai Phule Pune University (SPPU)',
  'Mumbai University',
  'Anna University, Chennai',
  'Delhi University',
  'University of Madras',
  'Osmania University',
  'Bangalore University',
  'Visvesvaraya Technological University (VTU)'
];

export default function Step15University() {
  const { watch, setValue } = useFormContext();
  const selectedUni = watch('university');
  const [uniList, setUniList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUniList(mockUniversities);
    }, 300);
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom textAlign="center">
        From which university?
      </Typography>
      <Autocomplete
        freeSolo
        options={uniList}
        value={selectedUni || ''}
        onChange={(_, newVal) => {
          setValue('university', newVal);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search your university" />
        )}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Suggested</Typography>
        <Box sx={{ mt: 1 }}>
          {uniList.map((uni) => (
            <Button
              key={uni}
              variant="outlined"
              sx={{ m: 1 }}
              onClick={() => setValue('university', uni)}
            >
              {uni}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
