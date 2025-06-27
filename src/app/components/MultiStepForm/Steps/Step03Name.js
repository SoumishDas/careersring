// components/MultiStepForm/Steps/Step03Name.js
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, TextField } from '@mui/material';

export default function Step03Name() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant="h5" gutterBottom>
        Hi, your name is
      </Typography>
      <TextField
        label="Enter your full name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name', { required: 'Name is required' })}
      />
    </Box>
  );
}
