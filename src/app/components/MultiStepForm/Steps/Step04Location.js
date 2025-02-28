import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';

const mockLocations = [
  'Pune',
  'Delhi',
  'Chennai',
  'Bengaluru / Bangalore',
  'Hyderabad / Secunderabad, Telangana',
  'Kolar',
  'Kollam',
  'Kolayat',
  'Kolasib'
];

export default function Step04Location() {
  const { register, setValue, watch } = useFormContext();
  const [locations, setLocations] = useState([]);
  const currentLocation = watch('currentLocation');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLocations(mockLocations);
    }, 500);
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Where are you now?
      </Typography>
      <Autocomplete
        freeSolo
        options={locations}
        value={currentLocation || ''}
        onChange={(_, newVal) => {
          setValue('currentLocation', newVal);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Your current location"
            {...register('currentLocation')}
          />
        )}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Popular locations</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
          {['Hyderabad / Secunderabad, Telangana', 'Bengaluru / Bangalore', 'Pune', 'Delhi', 'Chennai'].map(
            (loc) => (
              <Box
                key={loc}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  p: 1,
                  m: 1,
                  cursor: 'pointer'
                }}
                onClick={() => setValue('currentLocation', loc)}
              >
                {loc}
              </Box>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}
