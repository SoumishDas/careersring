// components/MultiStepForm/Steps/Step03Name.js
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, TextField } from '@mui/material';

export default function Step03Name() {
  const { register } = useFormContext();

  return (
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant="h5" gutterBottom>
        Hi, your name is
      </Typography>
      <TextField
        label="Enter your full name"
        fullWidth
        {...register('name')}
      />
    </Box>
  );
}
