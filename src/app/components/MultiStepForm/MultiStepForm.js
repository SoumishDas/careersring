"use client";

// components/MultiStepForm/MultiStepForm.js
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Container,
  Typography,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Import each step component
import Step01Phone from "./Steps/Step01Phone";
import Step02Resume from "./Steps/Step02Resume";
import Step03Name from "./Steps/Step03Name";
import Step04Location from "./Steps/Step04Location";
import Step05ExperienceLength from "./Steps/Step05ExperienceLength";
import Step06TellUsAboutWork from "./Steps/Step06TellUsAboutWork";
import Step07JoinDate from "./Steps/Step07JoinDate";
import Step08Skills from "./Steps/Step08Skills";
import Step09Salary from "./Steps/Step09Salary";
import Step10NoticePeriod from "./Steps/Step10NoticePeriod";
import Step11LinkedIn from "./Steps/Step11LinkedIn";
import Step12LatestIndustry from "./Steps/Step12LatestIndustry";
import Step13Gender from "./Steps/Step13Gender";
import Step14Qualification from "./Steps/Step14Qualification";
import Step15University from "./Steps/Step15University";
import Step16EducationType from "./Steps/Step16EducationType";
import Step17JobTitles from "./Steps/Step17JobTitles";
import Step18PreferredCities from "./Steps/Step18PreferredCities";

// Define the array of steps
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
  { component: <Step18PreferredCities />, progress: 96 },
];

export default function MultiStepForm({ candidateId }) {
  // React Hook Form with some default values
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      phone: "",
      email: "",
      name: "",
      currentLocation: "",
      totalExperienceYears: 0,
      totalExperienceMonths: 0,
      latestDesignation: "",
      latestCompany: "",
      joinYear: "",
      joinMonth: "",
      currentlyWorking: false,
      skills: [],
      annualSalary: "",
      noticePeriod: "",
      linkedinUrl: "",
      autoUpdateLinkedIn: true,
      industries: [],
      gender: "",
      highestQualification: "",
      university: "",
      educationType: "",
      jobTitles: [],
      preferredCities: [],
      // Add more if needed
    },
  });
  const { handleSubmit, reset } = methods;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved progress for new candidates
  useEffect(() => {
    if (!candidateId) {
      const saved = localStorage.getItem("multiStepData");
      if (saved) {
        try {
          reset(JSON.parse(saved));
        } catch {}
      }
    }
  }, [candidateId, reset]);

  // Persist progress to localStorage
  useEffect(() => {
    const sub = methods.watch((value) => {
      localStorage.setItem("multiStepData", JSON.stringify(value));
    });
    return () => sub.unsubscribe();
  }, [methods]);

  // Current step index
  const [currentStep, setCurrentStep] = useState(0);

  const mapFormToMasterCandidate = (data) => {
    return {
      FullName: data.name,
      Email: data.email || undefined,
      MobileNumber: data.phone || undefined,
      Gender: data.gender || undefined,
      CurrentLocation: data.currentLocation || undefined,
      AutoUpdateLinkedIn: data.autoUpdateLinkedIn,
      EducationType: data.educationType || undefined,
      ProfessionalExperience: {
        StartDate:
          data.joinYear && data.joinMonth
            ? `${data.joinYear}-${data.joinMonth}-01`
            : undefined,
        CurrentlyWorkingHere: data.currentlyWorking,
        CurrentSalary: data.annualSalary
          ? parseInt(data.annualSalary, 10)
          : undefined,
        NoticePeriod: data.noticePeriod || undefined,
      },
      Skills: (data.skills || []).map((s) => ({ Name: s })),
      JobTitles: (data.jobTitles || []).map((t) => ({ Title: t })),
      PreferredLocations: (data.preferredCities || []).map((c) => ({
        Name: c,
      })),
      Industries: (data.industries || []).map((i) => ({ Name: i })),
      Degree: data.highestQualification || undefined,
      UniversityBoardName: data.university || undefined,
      LinkedInProfileURL: data.linkedinUrl || undefined,
    };
  };

  // If candidateId is present, fetch old parser data from the bridge endpoint
  useEffect(() => {
    if (candidateId) {
      fetch(`/api/masterData/bridge/${candidateId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error fetching old data: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          // 'data' is shaped like your "MasterCandidate"
          // We'll reset the form with these values
          reset(data);
        })
        .catch((err) => {
          console.error("Failed to fetch old candidate data:", err);
        });
    }
  }, [candidateId, reset]);

  // Handle form submission
  const onSubmit = (formData) => {
    // If it's the last step, finalize
    if (currentStep === steps.length - 1) {
      setIsSubmitting(true);
      const payload = mapFormToMasterCandidate(formData);
      fetch("/api/masterData/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to submit form");
          }
          return res.json();
        })
        .then((createdRecord) => {
          console.log("Created record:", createdRecord);
          alert("Form submitted successfully");
        })
        .catch((err) => {
          console.error("Submission error:", err);
          alert("Error submitting form");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      // Otherwise, move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  // Skip logic
  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Back logic
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Top AppBar */}
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box />
            <Box>
              <IconButton color="inherit" sx={{ ml: 1 }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Step content */}
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          {steps[currentStep].component}

          {/* Progress bar */}
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

          {/* Navigation buttons */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
          >
            {/* Example: show "Skip" from step 2 onward, up to second-last step */}
            {currentStep >= 2 && currentStep < steps.length - 1 && (
              <Button
                variant="text"
                onClick={handleSkip}
                disabled={isSubmitting}
              >
                Skip
              </Button>
            )}
            {currentStep < 2 && <Box />} {/* filler if no skip shown */}
            {/* Back button (hide on first step) */}
            {currentStep > 0 && (
              <Button
                onClick={handleBack}
                variant="outlined"
                sx={{ mr: 2 }}
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
            {/* Next or Submit button */}
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
              disabled={isSubmitting}
            >
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </Container>
      </form>
    </FormProvider>
  );
}
