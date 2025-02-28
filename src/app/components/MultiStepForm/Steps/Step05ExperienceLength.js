import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  TextField,
  MenuItem
} from '@mui/material';

export default function Step05ExperienceLength() {
  const { register } = useFormContext();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        How long have you been working?
      </Typography>
      <Typography variant="body2" color="textSecondary">
        If you are student/fresher, choose 0 year and 0 month
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          select
          label="Year"
          sx={{ width: '50%' }}
          {...register('totalExperienceYears')}
        >
          {[...Array(51)].map((_, i) => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Month"
          sx={{ width: '50%' }}
          {...register('totalExperienceMonths')}
        >
          {[...Array(12)].map((_, i) => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}
