import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Clear the session cookie or perform any logout operations
    const response = NextResponse.redirect('/login');
    response.cookies.delete('metamaskAccount'); // Example cookie name
    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.error();
  }
}