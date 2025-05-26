import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Example GET endpoint for /api/hello
export async function GET(request: NextRequest) {
  // Using the request parameter to demonstrate its usage
  const url = request.url;
  return NextResponse.json({ 
    message: 'Hello from Next.js API route!',
    url: url 
  });
} 