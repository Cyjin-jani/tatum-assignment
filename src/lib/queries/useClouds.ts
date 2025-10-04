import { useSuspenseQuery } from '@tanstack/react-query';
import { Cloud } from '@/types';

const fetchClouds = async (): Promise<Cloud[]> => {
  const response = await fetch('/api/clouds');
  if (!response.ok) {
    throw new Error('Failed to fetch clouds');
  }
  return response.json();
};

export const useClouds = () => {
  return useSuspenseQuery({
    queryKey: ['clouds'],
    queryFn: fetchClouds,
  });
};
