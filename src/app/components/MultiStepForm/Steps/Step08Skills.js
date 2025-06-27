import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';

const mockSkills = [
  'C',
  'C++',
  'Java',
  'Python',
  'Bash',
  'Machine Learning',
  'Numpy',
  'Scripting',
  'Linux',
  'Software Engineering',
  'Django',
  'Ruby'
];

export default function Step08Skills() {
  const {
    watch,
    setValue,
    formState: { errors },
    register,
  } = useFormContext();
  const selectedSkills = watch('skills') || [];
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAllSkills(mockSkills);
    }, 300);
  }, []);

  // register field for validation
  useEffect(() => {
    register('skills', {
      validate: (val) =>
        (val && val.length > 0) || 'At least one skill is required',
    });
  }, [register]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Tell the world about your skills
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Your skills act as target keywords that boost the ranking of your profile
      </Typography>

      <Autocomplete
        multiple
        options={allSkills}
        value={selectedSkills}
        onChange={(_, newVal) => {
          setValue('skills', newVal);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter your skills"
            error={!!errors.skills}
            helperText={errors.skills?.message}
          />
        )}
        sx={{ mt: 2 }}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Suggested Skills</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {mockSkills.map((skill) => (
            <Box
              key={skill}
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                p: '4px 8px',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (!selectedSkills.includes(skill)) {
                  setValue('skills', [...selectedSkills, skill]);
                }
              }}
            >
              {skill}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
