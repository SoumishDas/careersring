import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Button } from '@mui/material';

const eduTypes = ['Full time', 'Part time', 'Correspondence'];

export default function Step16EducationType() {
  const { watch, setValue } = useFormContext();
  const selectedEdu = watch('educationType');

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        {watch('highestQualification') || 'Higher Qualification'}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Almost there. What type of education was it?
      </Typography>

      <Box sx={{ mt: 2 }}>
        {eduTypes.map((type) => (
          <Button
            key={type}
            variant={selectedEdu === type ? 'contained' : 'outlined'}
            onClick={() => setValue('educationType', type)}
            sx={{ m: 1 }}
          >
            {type}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
