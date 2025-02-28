import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, TextField } from '@mui/material';

export default function Step09Salary() {
  const { register } = useFormContext();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What’s your latest annual salary?
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <TextField
          label="Currency"
          value="INR"
          sx={{ width: '20%' }}
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Enter amount"
          sx={{ width: '80%' }}
          {...register('annualSalary')}
        />
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        E.g. INR Two Thousand Five Hundred Thirty Five (Annually)
      </Typography>
    </Box>
  );
}
