'use client';

import { useClouds } from '@/lib/queries/useClouds';
import { CloudTable } from './CloudTable';
import { CreateCloudButton } from './CreateCloudButton';

function CloudList() {
  const { data } = useClouds();

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cloud List</h1>
        <CreateCloudButton />
      </div>
      <CloudTable clouds={data} />
    </div>
  );
}

export default CloudList;
