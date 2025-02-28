// components/MultiStepForm/Steps/Step02Resume.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function Step02Resume() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        You are unique. Let your profile show it.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Uploading resumes can result in 25% more recruiter calls
      </Typography>

      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: 2,
          mt: 3,
          p: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Recommended - Save 50% of time!
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }}>
          <strong>Upload resume & auto-fill profile</strong>
        </Button>
        <Typography variant="body2" color="textSecondary">
          Supported formats: .Doc, .Docx, .RTF, .PDF | Max file size: 6MB
        </Typography>
      </Box>

      <Button variant="outlined" sx={{ mt: 2 }}>
        No resume? No worries — Continue manually
      </Button>
    </Box>
  );
}
