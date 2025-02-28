import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField, Button } from '@mui/material';

const mockQualifications = [
  'Bachelor of Technology (B.Tech/B.E)',
  'Bachelor of Commerce (B.Com)',
  'Bachelor of Science (B.Sc)',
  '12th Class / HSC',
  'Diploma',
  'Master of Business Administration (M.B.A)',
  'Bachelor of Arts (B.A)'
];

export default function Step14Qualification() {
  const { watch, setValue } = useFormContext();
  const selectedQualification = watch('highestQualification');
  const [qualificationList, setQualificationList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setQualificationList(mockQualifications);
    }, 300);
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom textAlign="center">
        What is your highest qualification?
      </Typography>
      <Autocomplete
        freeSolo
        options={qualificationList}
        value={selectedQualification || ''}
        onChange={(_, newVal) => {
          setValue('highestQualification', newVal);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter or select your highest qualification"
          />
        )}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Suggested</Typography>
        <Box sx={{ mt: 1 }}>
          {qualificationList.map((qual) => (
            <Button
              key={qual}
              variant="outlined"
              sx={{ m: 1 }}
              onClick={() => setValue('highestQualification', qual)}
            >
              {qual}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
