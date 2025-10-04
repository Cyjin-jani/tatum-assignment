import { useSuspenseQuery } from '@tanstack/react-query';
import { Cloud } from '@/types';

const fetchClouds = async (): Promise<Cloud[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/clouds`);
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
