import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // TODO: Fetch due posts and send them

  return NextResponse.json({ status: 'success', message: 'Scheduled task executed.' });
} 