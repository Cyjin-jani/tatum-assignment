'use client';

import { CloudTable } from './CloudTable';
import { CreateCloudButton } from './CreateCloudButton';

export function CloudList() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cloud List</h1>
        <CreateCloudButton />
      </div>
      <CloudTable />
    </div>
  );
}
