import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch
} from '@mui/material';

export default function Step07JoinDate() {
  const { register } = useFormContext();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        When did you join your latest company?
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          select
          label="Year"
          sx={{ width: '50%' }}
          {...register('joinYear')}
        >
          {[...Array(51)].map((_, i) => {
            const year = 2023 - i;
            return (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            );
          })}
        </TextField>

        <TextField
          select
          label="Month"
          sx={{ width: '50%' }}
          {...register('joinMonth')}
        >
          {[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ].map((m, idx) => (
            <MenuItem key={m} value={idx + 1}>
              {m}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <FormControlLabel
        control={<Switch {...register('currentlyWorking')} />}
        label="Currently working here"
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
