#!/usr/bin/env bash

# 1. Create directories
mkdir -p pages
mkdir -p components/MultiStepForm/Steps

# 2. Create pages/_app.js
cat << 'EOF' > pages/_app.js
import * as React from 'react';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Customize your theme here if needed
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Foundit Multi-Step Form</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
EOF

# 3. Create pages/index.js
cat << 'EOF' > pages/index.js
import React from 'react';
import MultiStepForm from '../components/MultiStepForm/MultiStepForm';

export default function HomePage() {
  return <MultiStepForm />;
}
EOF

# 4. Create components/MultiStepForm/MultiStepForm.js
cat << 'EOF' > components/MultiStepForm/MultiStepForm.js
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Container,
  Typography,
  LinearProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Step01Phone from './Steps/Step01Phone';
import Step02Resume from './Steps/Step02Resume';
import Step03Name from './Steps/Step03Name';
import Step04Location from './Steps/Step04Location';
import Step05ExperienceLength from './Steps/Step05ExperienceLength';
import Step06TellUsAboutWork from './Steps/Step06TellUsAboutWork';
import Step07JoinDate from './Steps/Step07JoinDate';
import Step08Skills from './Steps/Step08Skills';
import Step09Salary from './Steps/Step09Salary';
import Step10NoticePeriod from './Steps/Step10NoticePeriod';
import Step11LinkedIn from './Steps/Step11LinkedIn';
import Step12LatestIndustry from './Steps/Step12LatestIndustry';
import Step13Gender from './Steps/Step13Gender';
import Step14Qualification from './Steps/Step14Qualification';
import Step15University from './Steps/Step15University';
import Step16EducationType from './Steps/Step16EducationType';
import Step17JobTitles from './Steps/Step17JobTitles';
import Step18PreferredCities from './Steps/Step18PreferredCities';

// Define steps array (component + progress)
const steps = [
  { component: <Step01Phone />, progress: 0 },
  { component: <Step02Resume />, progress: 5 },
  { component: <Step03Name />, progress: 14 },
  { component: <Step04Location />, progress: 17 },
  { component: <Step05ExperienceLength />, progress: 19 },
  { component: <Step06TellUsAboutWork />, progress: 28 },
  { component: <Step07JoinDate />, progress: 32 },
  { component: <Step08Skills />, progress: 39 },
  { component: <Step09Salary />, progress: 42 },
  { component: <Step10NoticePeriod />, progress: 46 },
  { component: <Step11LinkedIn />, progress: 53 },
  { component: <Step12LatestIndustry />, progress: 57 },
  { component: <Step13Gender />, progress: 60 },
  { component: <Step14Qualification />, progress: 67 },
  { component: <Step15University />, progress: 82 },
  { component: <Step16EducationType />, progress: 89 },
  { component: <Step17JobTitles />, progress: 92 },
  { component: <Step18PreferredCities />, progress: 96 }
];

export default function MultiStepForm() {
  const methods = useForm({
    defaultValues: {
      phone: '',
      name: '',
      currentLocation: '',
      totalExperienceYears: 0,
      totalExperienceMonths: 0,
      latestDesignation: '',
      latestCompany: '',
      joinYear: '',
      joinMonth: '',
      currentlyWorking: false,
      skills: [],
      annualSalary: '',
      noticePeriod: '',
      linkedinUrl: '',
      autoUpdateLinkedIn: true,
      industries: [],
      gender: '',
      highestQualification: '',
      university: '',
      educationType: '',
      jobTitles: [],
      preferredCities: []
    }
  });

  const { handleSubmit } = methods;
  const [currentStep, setCurrentStep] = useState(0);

  // Handle form submission
  const onSubmit = (data) => {
    if (currentStep === steps.length - 1) {
      console.log('Final form data:', data);
      alert('Form submitted! Check console for data.');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box />
            <Box>
              <IconButton color="inherit" sx={{ ml: 1 }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" sx={{ mt: 4 }}>
          {steps[currentStep].component}

          <Box sx={{ mt: 4 }}>
            <LinearProgress
              variant="determinate"
              value={steps[currentStep].progress}
              sx={{ height: 8, borderRadius: 1 }}
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="body2">
                {steps[currentStep].progress}%
              </Typography>
              <Typography variant="body2">
                Step {currentStep + 1} of {steps.length}
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
          >
            {currentStep >= 2 && currentStep < steps.length - 1 && (
              <Button variant="text" onClick={handleSkip}>
                Skip
              </Button>
            )}
            {currentStep < 2 && <Box />}

            {currentStep > 0 && (
              <Button onClick={handleBack} variant="outlined" sx={{ mr: 2 }}>
                Back
              </Button>
            )}

            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Container>
      </form>
    </FormProvider>
  );
}
EOF

# 5. Create step files

cat << 'EOF' > components/MultiStepForm/Steps/Step01Phone.js
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, TextField, FormControlLabel, Switch, Link } from '@mui/material';

export default function Step01Phone() {
  const { register } = useFormContext();

  useEffect(() => {
    // Example: fetch phone codes from an API if needed
  }, []);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Recruiter should reach you on?
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          label="Code"
          value="+91"
          sx={{ width: '20%', mr: 1 }}
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Enter your mobile number"
          sx={{ width: '80%' }}
          {...register('phone')}
        />
      </Box>

      <FormControlLabel
        control={<Switch defaultChecked {...register('whatsappNotifications')} />}
        label="Receive job related notifications on WhatsApp"
        sx={{ mt: 2 }}
      />

      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        By clicking on ‘Continue’ I agree to Foundit's{' '}
        <Link href="#" underline="hover">
          Terms and Conditions
        </Link>
        ,{' '}
        <Link href="#" underline="hover">
          Privacy Policy
        </Link>{' '}
        and default mailer and communications settings governing the use of foundit.ae
      </Typography>
    </Box>
  );
}
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step02Resume.js
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
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step03Name.js
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, TextField } from '@mui/material';

export default function Step03Name() {
  const { register } = useFormContext();

  return (
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant="h5" gutterBottom>
        Hi, your name is
      </Typography>
      <TextField
        label="Enter your full name"
        fullWidth
        {...register('name')}
      />
    </Box>
  );
}
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step04Location.js
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
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step05ExperienceLength.js
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
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step06TellUsAboutWork.js
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, TextField } from '@mui/material';

export default function Step06TellUsAboutWork() {
  const { register } = useFormContext();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Tell us about work
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Enter your latest designation and company
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Select your latest designation"
          {...register('latestDesignation')}
        />
        <TextField
          label="Select your latest company"
          {...register('latestCompany')}
        />
      </Box>
    </Box>
  );
}
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step07JoinDate.js
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
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step08Skills.js
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
  const { watch, setValue } = useFormContext();
  const selectedSkills = watch('skills') || [];
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAllSkills(mockSkills);
    }, 300);
  }, []);

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
          <TextField {...params} label="Enter your skills" />
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
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step09Salary.js
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
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step10NoticePeriod.js
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
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step11LinkedIn.js
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
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step12LatestIndustry.js
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';

const mockIndustries = [
  'Ad Retargeting',
  'Machine Learning',
  'E-commerce',
  'Finance',
  'Healthcare',
  'Education',
  'IT Services'
];

export default function Step12LatestIndustry() {
  const { watch, setValue } = useFormContext();
  const selectedIndustries = watch('industries') || [];
  const [industryList, setIndustryList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIndustryList(mockIndustries);
    }, 300);
  }, []);

  const handleChange = (_, newVal) => {
    if (newVal.length <= 2) {
      setValue('industries', newVal);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What’s your latest industry?
      </Typography>
      <Typography variant="body2" color="textSecondary">
        You can select max 2
      </Typography>

      <Autocomplete
        multiple
        options={industryList}
        value={selectedIndustries}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Enter your industry" />
        )}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step13Gender.js
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Button } from '@mui/material';

const genders = ['Male', 'Female', 'Prefer not to say'];

export default function Step13Gender() {
  const { watch, setValue } = useFormContext();
  const selectedGender = watch('gender');

  const handleSelect = (val) => {
    setValue('gender', val);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Your gender?
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Recruiters ask for your gender for diversity hiring
      </Typography>
      <Box sx={{ mt: 2 }}>
        {genders.map((g) => (
          <Button
            key={g}
            variant={selectedGender === g ? 'contained' : 'outlined'}
            onClick={() => handleSelect(g)}
            sx={{ m: 1 }}
          >
            {g}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step14Qualification.js
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField, Button } from '@mui/material';

const mockQualifications = [
  'Bachelor of Technology (B.Tech/B.E)',
  'Bachelor of Commerce (B.Com)',
  'Bachelor of Science (B.Sc)',
  '12th Class / HSC',
  'Diploma',
  'Master of Business Administration (M.B.A)',
  'Bachelor of Arts (B.A)'
];

export default function Step14Qualification() {
  const { watch, setValue } = useFormContext();
  const selectedQualification = watch('highestQualification');
  const [qualificationList, setQualificationList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setQualificationList(mockQualifications);
    }, 300);
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom textAlign="center">
        What is your highest qualification?
      </Typography>
      <Autocomplete
        freeSolo
        options={qualificationList}
        value={selectedQualification || ''}
        onChange={(_, newVal) => {
          setValue('highestQualification', newVal);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter or select your highest qualification"
          />
        )}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Suggested</Typography>
        <Box sx={{ mt: 1 }}>
          {qualificationList.map((qual) => (
            <Button
              key={qual}
              variant="outlined"
              sx={{ m: 1 }}
              onClick={() => setValue('highestQualification', qual)}
            >
              {qual}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step15University.js
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField, Button } from '@mui/material';

const mockUniversities = [
  'Savitribai Phule Pune University (SPPU)',
  'Mumbai University',
  'Anna University, Chennai',
  'Delhi University',
  'University of Madras',
  'Osmania University',
  'Bangalore University',
  'Visvesvaraya Technological University (VTU)'
];

export default function Step15University() {
  const { watch, setValue } = useFormContext();
  const selectedUni = watch('university');
  const [uniList, setUniList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUniList(mockUniversities);
    }, 300);
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom textAlign="center">
        From which university?
      </Typography>
      <Autocomplete
        freeSolo
        options={uniList}
        value={selectedUni || ''}
        onChange={(_, newVal) => {
          setValue('university', newVal);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search your university" />
        )}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Suggested</Typography>
        <Box sx={{ mt: 1 }}>
          {uniList.map((uni) => (
            <Button
              key={uni}
              variant="outlined"
              sx={{ m: 1 }}
              onClick={() => setValue('university', uni)}
            >
              {uni}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step16EducationType.js
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Button } from '@mui/material';

const eduTypes = ['Full time', 'Part time', 'Correspondence'];

export default function Step16EducationType() {
  const { watch, setValue } = useFormContext();
  const selectedEdu = watch('educationType');

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        {watch('highestQualification') || 'Higher Qualification'}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Almost there. What type of education was it?
      </Typography>

      <Box sx={{ mt: 2 }}>
        {eduTypes.map((type) => (
          <Button
            key={type}
            variant={selectedEdu === type ? 'contained' : 'outlined'}
            onClick={() => setValue('educationType', type)}
            sx={{ m: 1 }}
          >
            {type}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step17JobTitles.js
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';

const mockJobTitles = [
  'CEO',
  'Consultant',
  'Software Engineer',
  'Project Manager',
  'Business Analyst',
  'UI/UX Designer'
];

export default function Step17JobTitles() {
  const { watch, setValue } = useFormContext();
  const selectedJobs = watch('jobTitles') || [];
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAllJobs(mockJobTitles);
    }, 300);
  }, []);

  const handleChange = (_, newVal) => {
    if (newVal.length <= 2) {
      setValue('jobTitles', newVal);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What are your preferred job titles?
      </Typography>
      <Typography variant="body2" color="textSecondary">
        You can select max 2
      </Typography>

      <Autocomplete
        multiple
        options={allJobs}
        value={selectedJobs}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} label="Enter your preferred job titles" />}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
EOF

cat << 'EOF' > components/MultiStepForm/Steps/Step18PreferredCities.js
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
EOF

echo "All files created successfully!"
echo "----------------------------------------------------"
echo "Next steps:"
echo "1. Install dependencies:"
echo "   npm install next react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled react-hook-form"
echo "2. Run your dev server:"
echo "   npm run dev"
echo "3. Open http://localhost:3000 in your browser."
echo "----------------------------------------------------"