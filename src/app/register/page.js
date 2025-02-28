'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import MultiStepForm from '../components/MultiStepForm/MultiStepForm';

export default function MultiStepPage() {

  // e.g. /multi-step?candidateId=123
  const  candidateId  = useSearchParams().get('candidateId');

  return <MultiStepForm candidateId={candidateId} />;
}
