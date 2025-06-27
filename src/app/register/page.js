'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MultiStepForm from '../components/MultiStepForm/MultiStepForm';

function FormLoader() {
  const candidateId = useSearchParams().get('candidateId');
  return <MultiStepForm candidateId={candidateId} />;
}

export default function MultiStepPage() {
  return (
    <Suspense>
      <FormLoader />
    </Suspense>
  );
}
