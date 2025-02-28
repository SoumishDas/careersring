import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Button } from '@mui/material';

const noticeOptions = [
  'Serving notice period',
  'Immediately available',
  '15 Days',
  '30 Days',
  '45 Days',
  '2 Months',
  '3 Months',
  '6 Months'
];

export default function Step10NoticePeriod() {
  const { setValue, watch } = useFormContext();
  const currentNotice = watch('noticePeriod');

  const handleSelect = (val) => {
    setValue('noticePeriod', val);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What’s your notice period like?
      </Typography>
      <Box sx={{ mt: 2 }}>
        {noticeOptions.map((period) => (
          <Button
            key={period}
            variant={currentNotice === period ? 'contained' : 'outlined'}
            onClick={() => handleSelect(period)}
            sx={{ m: 1 }}
          >
            {period}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
