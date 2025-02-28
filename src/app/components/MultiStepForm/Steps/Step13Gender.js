import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Button } from '@mui/material';

const genders = ['Male', 'Female', 'Prefer not to say'];

export default function Step13Gender() {
  const { watch, setValue } = useFormContext();
  const selectedGender = watch('gender');

  const handleSelect = (val) => {
    setValue('gender', val);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Your gender?
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Recruiters ask for your gender for diversity hiring
      </Typography>
      <Box sx={{ mt: 2 }}>
        {genders.map((g) => (
          <Button
            key={g}
            variant={selectedGender === g ? 'contained' : 'outlined'}
            onClick={() => handleSelect(g)}
            sx={{ m: 1 }}
          >
            {g}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
