'use client';

import { useClouds } from '@/lib/queries/useClouds';
import { CloudTableRow } from './CloudTableRow';

export function CloudTableRows() {
  const { data } = useClouds();

  return (
    <>
      {data.map(cloud => (
        <CloudTableRow key={cloud.id} cloud={cloud} />
      ))}
    </>
  );
}
