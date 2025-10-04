'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorFallback from '@/components/shared/ErrorFallback';
import CloudList from './CloudList';

function CloudListPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CloudList />
      </ErrorBoundary>
    </Suspense>
  );
}

export default CloudListPage;
