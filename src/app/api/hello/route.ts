import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Example GET endpoint for /api/hello
export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js API route!' });
} 