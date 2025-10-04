import { NextResponse } from 'next/server';
import { Cloud } from '@/types';
import cloudsData from './clouds.mock.json';

export async function GET() {
  try {
    // 500ms 고정 지연
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(cloudsData as Cloud[]);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
