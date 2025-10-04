'use client';

import { useClouds } from '@/lib/queries/useClouds';
import { CloudTable } from './CloudTable';

function CloudList() {
  const { data } = useClouds();

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Cloud List</h1>
      <CloudTable clouds={data} />
    </div>
  );
}

export default CloudList;
