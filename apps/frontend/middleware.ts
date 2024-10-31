// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn'); 

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url)); 
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ['/routines/:path*'],
};
