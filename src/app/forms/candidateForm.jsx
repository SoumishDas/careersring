'use client';

import { Box, Button, Container, Grid, TextField, Typography,Autocomplete } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState,useEffect } from "react";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  gender: yup.string().required("Gender is required"),
  totalExperience: yup.object().shape({
    years: yup.number().positive().integer().required("Years is required"),
    months: yup.number().positive().integer().required("Months is required"),
  }),
  currentLocation: yup.string().required("Current location is required"),
  currentJobTitle: yup.string().required("Current job title is required"),
  company: yup.string().required("Company is required"),
  highestQualification: yup.string().required("Highest qualification is required"),
  startDate: yup.date().required("Start date is required"),
  isCurrentlyWorking: yup.boolean().required(),
  currentSalary: yup.number().positive().integer().required("Current salary is required"),
  expectedSalary: yup.number().positive().integer().required("Expected salary is required"),
  noticePeriod: yup.string().required("Notice period is required"),
  keySkills: yup.string().required("Key skills are required"),
  preferredJobTitle: yup.string().required("Preferred job title is required"),
  preferredLocation: yup.string().required("Preferred location is required"),
});

export default function CandidateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/candidate", data);
      alert("Form submitted successfully");
    } catch (error) {
      alert("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };
  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [highestQualifications, setHighestQualifications] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await axios.get("/api/skills");
      setSkills(response.data);
    };
    fetchSkills();

    const fetchLocations = async () => {
      const response = await axios.get("/api/locations");
      setLocations(response.data);
    };
    fetchLocations();

    const fetchJobTitles = async () => {
      const response = await axios.get("/api/job-titles");
      setJobTitles(response.data);
    };
    fetchJobTitles();

    const fetchCompanies = async () => {
      const response = await axios.get("/api/companies");
      setCompanies(response.data);
    };
    fetchCompanies();

    const fetchHighestQualifications = async () => {
      const response = await axios.get("/api/highest-qualifications");
      setHighestQualifications(response.data);
    };
    fetchHighestQualifications();
  }, []);
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Candidate Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                {...register("fullName")}
                error={errors.fullName?.message}
                helperText={errors.fullName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                {...register("mobileNumber")}
                error={errors.mobileNumber?.message}
                helperText={errors.mobileNumber?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={errors.email?.message}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gender"
                {...register("gender")}
                select
                SelectProps={{
                  native: true,
                }}
                error={errors.gender?.message}
                helperText={errors.gender?.message}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Years"
                type="number"
                {...register("totalExperience.years")}
                error={errors.totalExperience?.years?.message}
                helperText={errors.totalExperience?.years?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Months"
                type="number"
                {...register("totalExperience.months")}
                error={errors.totalExperience?.months?.message}
                helperText={errors.totalExperience?.months?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                options={locations}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Current Location"
                    error={errors.currentLocation?.message}
                    helperText={errors.currentLocation?.message}
                  />
                )}
                {...register("currentLocation")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                options={jobTitles}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Current Job Title"
                    error={errors.currentJobTitle?.message}
                    helperText={errors.currentJobTitle?.message}
                  />
                )}
                {...register("currentJobTitle")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                options={companies}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Company"
                    error={errors.company?.message}
                    helperText={errors.company?.message}
                  />
                )}
                {...register("company")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                options={highestQualifications}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Highest Qualification"
                    error={errors.highestQualification?.message}
                    helperText={errors.highestQualification?.message}
                  />
                )}
                {...register("highestQualification")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                {...register("startDate")}
                error={errors.startDate?.message}
                helperText={errors.startDate?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Salary (Annual)"
                type="number"
                {...register("currentSalary")}
                error={errors.currentSalary?.message}
                helperText={errors.currentSalary?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expected Salary (Annual)"
                type="number"
                {...register("expectedSalary")}
                error={errors.expectedSalary?.message}
                helperText={errors.expectedSalary?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Notice Period"
                {...register("noticePeriod")}
                select
                SelectProps={{
                  native: true,
                }}
                error={errors.noticePeriod?.message}
                helperText={errors.noticePeriod?.message}
              >
                <option value="1 Month">1 Month</option>
                <option value="2 Months">2 Months</option>
                <option value="3 Months">3 Months</option>
                <option value="4 Months">4 Months</option>
                <option value="5 Months">5 Months</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
            
              <Autocomplete
                multiple
                fullWidth
                options={skills}
                getOptionLabel={(option) => option}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Key Skills"
                    error={errors.keySkills?.message}
                    helperText={errors.keySkills?.message}
                  />
                )}
                {...register("keySkills")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                options={jobTitles}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Preferred Job Title"
                    error={errors.preferredJobTitle?.message}
                    helperText={errors.preferredJobTitle?.message}
                  />
                )}
                {...register("preferredJobTitle")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                options={locations}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Preferred Location"
                    error={errors.preferredLocation?.message}
                    helperText={errors.preferredLocation?.message}
                  />
                )}
                {...register("preferredLocation")}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>  
  );
}

