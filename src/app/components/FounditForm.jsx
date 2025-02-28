// components/FounditForm.js

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Container,
  Link
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function FounditForm() {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Form submitted! Check console for data.');
  };

  return (
    <>
      {/* Top AppBar with Login button */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="text" color="primary">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            A number of jobs await
          </Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '100%', mt: 2 }}
          >
            {/* Google Sign-in Button */}
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              sx={{ mb: 2 }}
            >
              Google
            </Button>

            {/* Email Field */}
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />

            {/* Phone Number Fields */}
            <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
              <TextField
                label="Code"
                value="+91"
                sx={{ width: '25%', mr: 1 }}
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField
                label="Enter your mobile number"
                fullWidth
                {...register('phone', {
                  required: 'Phone number is required'
                })}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ''}
              />
            </Box>

            {/* WhatsApp Notification Switch */}
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  {...register('whatsappNotifications')}
                />
              }
              label="Receive job related notifications on WhatsApp"
              sx={{ mt: 2 }}
            />

            {/* Submit / Continue Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              Continue
            </Button>

            {/* Disclaimer Text */}
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              By clicking on ‘Continue’ I agree to Foundit's{' '}
              <Link href="#" underline="hover">
                Terms and Conditions
              </Link>
              ,{' '}
              <Link href="#" underline="hover">
                Privacy Policy
              </Link>{' '}
              and default mailer and communications settings governing
              the use of foundit.ae
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
