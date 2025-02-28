import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, TextField, FormControlLabel, Switch } from '@mui/material';

export default function Step11LinkedIn() {
  const { register } = useFormContext();

  return (
    <Box>
      <Typography variant="h5" gutterBottom textAlign="center">
        Share your LinkedIn profile with us
      </Typography>
      <Typography variant="body2" color="textSecondary" textAlign="center">
        We’ll pick up your publicly available information and update your profile. 
        You can edit it anytime.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="LinkedIn URL"
          placeholder="https://www.linkedin.com/in/your-profile"
          fullWidth
          {...register('linkedinUrl')}
        />
      </Box>
      <FormControlLabel
        control={<Switch defaultChecked {...register('autoUpdateLinkedIn')} />}
        label="Auto-Update"
        sx={{ mt: 2 }}
      />
      <Typography variant="body2" sx={{ ml: 4 }}>
        - Keep your profile auto updated <br />
        - Get personalized recommendations <br />
        - Highlight your achievements
      </Typography>
    </Box>
  );
}
