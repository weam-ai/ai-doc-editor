'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface SessionValidatorProps {
  children: React.ReactNode;
}

export function SessionValidator({ children }: SessionValidatorProps) {
  const [isValidating, setIsValidating] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const validateSession = async () => {
      try {
        // Skip validation for 404 page and auth pages to prevent infinite redirects
        if (pathname === '/404' || pathname === '/not-found' || pathname.startsWith('/auth')) {
          setHasSession(true);
          setIsValidating(false);
          return;
        }

        // Check if we have session cookies or localStorage data
        const hasSessionCookie = document.cookie.includes('weam='); // Based on your cookie name
        
        if (hasSessionCookie) {
          setHasSession(true);
        } else {
          // Try to make a simple API call to check if session is valid
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/documents`);
            if (response.status === 200) {
              setHasSession(true);
            } else if (response.status === 401) {
              setHasSession(false);
            } else {
              setHasSession(false);
            }
          } catch (apiError) {
            console.error('API check failed:', apiError);
            setHasSession(false);
          }
        }
      } catch (error) {
        console.error('Session validation error:', error);
        setHasSession(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateSession();
  }, [pathname]);

  // Skip validation for 404 and auth pages
  if (pathname === '/404' || pathname === '/not-found' || pathname.startsWith('/auth')) {
    return <>{children}</>;
  }

  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or you don't have access to it.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go back home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
