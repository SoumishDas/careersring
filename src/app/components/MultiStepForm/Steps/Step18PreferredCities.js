import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField, Button } from '@mui/material';

const mockCities = [
  'Bengaluru / Bangalore',
  'Hyderabad / Secunderabad, Telangana',
  'Pune',
  'Chennai',
  'Delhi',
  'Mumbai',
  'Kolkata'
];

export default function Step18PreferredCities() {
  const { watch, setValue } = useFormContext();
  const preferredCities = watch('preferredCities') || [];
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setCityList(mockCities);
    }, 300);
  }, []);

  const handleChange = (_, newVal) => {
    if (newVal.length <= 5) {
      setValue('preferredCities', newVal);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Which city do you want to work in?
      </Typography>
      <Typography variant="body2" color="textSecondary">
        You can select max 5
      </Typography>

      <Autocomplete
        multiple
        options={cityList}
        value={preferredCities}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Enter your preferred locations" />
        )}
        sx={{ mt: 2 }}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Suggested</Typography>
        <Box sx={{ mt: 1 }}>
          {['Bengaluru / Bangalore', 'Hyderabad / Secunderabad, Telangana', 'Pune', 'Chennai', 'Delhi'].map(
            (city) => (
              <Button
                key={city}
                variant="outlined"
                sx={{ m: 1 }}
                onClick={() => {
                  if (!preferredCities.includes(city) && preferredCities.length < 5) {
                    setValue('preferredCities', [...preferredCities, city]);
                  }
                }}
              >
                {city}
              </Button>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}
