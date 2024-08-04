import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { account } = await req.json();
    
    if (!account) {
      return NextResponse.json({ error: 'No account provided' }, { status: 400 });
    }
    
    // Set the session cookie (use appropriate cookie handling library or method)
    const response = NextResponse.json({ success: true });
    response.cookies.set('metamaskAccount', account, { httpOnly: true, maxAge: 3600 }); // Set the cookie as needed
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Failed to set session' }, { status: 500 });
  }
}