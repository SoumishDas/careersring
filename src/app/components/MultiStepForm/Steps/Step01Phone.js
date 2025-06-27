// components/MultiStepForm/Steps/Step01Phone.js
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Link,
} from '@mui/material';

export default function Step01Phone() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
          error={!!errors.phone}
          helperText={errors.phone?.message}
          {...register('phone', {
            required: 'Phone is required',
            pattern: {
              value: /^\d{10}$/, // simple validation
              message: 'Enter a valid 10 digit phone number',
            },
          })}
        />
      </Box>

      <FormControlLabel
        control={<Switch defaultChecked {...register('whatsappNotifications')} />}
        label="Receive job related notifications on WhatsApp"
        sx={{ mt: 2 }}
      />

      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        By clicking on ‘Continue’ I agree to Foundit&apos;s{' '}
        <Link href="#" underline="hover">
          Terms and Conditions
        </Link>
        ,{' '}
        <Link href="#" underline="hover">
          Privacy Policy
        </Link>{' '}
        and default mailer and communications settings governing the use of
        foundit.ae
      </Typography>
    </Box>
  );
}
