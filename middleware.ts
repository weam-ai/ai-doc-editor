import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './app/config/withSession';
import { getHostnameFromRequest } from '@/lib/utils';


// Helper function to call check-access API
async function callCheckAccessAPI(userId: string, urlPath: string, baseUrl: string) {
  try {
    const basePath = process.env.NEXT_PUBLIC_API_BASE_PATH;
    const fullUrl = `${baseUrl}${basePath}/api/auth/check-access`;
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        urlPath
      }),
    });

    if (!response.ok) {
      return false;
    }

    const jsonData = await response.json();
    
    return jsonData.data?.hasAccess;
  } catch (error) {
    return false;
  }
}


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = getHostnameFromRequest(request);
  const session = await getSession();
  
  // Call check-access API for every page access (except API routes and static files)
  if (!pathname.startsWith('/api/') && !pathname.startsWith('/_next/') && !pathname.includes('.') && session?.user?.roleCode === 'USER') {
    try {          
      if (session?.user && session?.user?._id) {
        // Call check-access API for every page access
        const hasAccess = await callCheckAccessAPI(session?.user?._id, process.env.NEXT_PUBLIC_API_BASE_PATH || '', hostname || '');
        
        // If access is denied, redirect to login page
        if (!hasAccess) {          
          return NextResponse.redirect(new URL('/login', request.url));
        } else {
          return NextResponse.next();
        }
      } else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      console.error('Error in middleware check-access call:', error);
      // Redirect to login page on error
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};