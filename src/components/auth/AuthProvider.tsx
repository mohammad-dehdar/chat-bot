'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useInitialRequest } from '@/hooks/useInitialRequest';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthorized = useAuth();
  const initialRequest = useInitialRequest();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for authentication to complete
    if (isAuthorized === 'loading') {
      return;
    }

    // If not authorized, don't proceed
    if (isAuthorized === false) {
      setIsReady(false);
      return;
    }

    // If authorized, wait for initial request
    if (isAuthorized === true) {
      // Initial request will be made automatically by useInitialRequest
      // We can proceed once it's done (or if it fails, we still proceed)
      setIsReady(true);
    }
  }, [isAuthorized, initialRequest.loading]);

  // Show loading state while authenticating or making initial request
  if (isAuthorized === 'loading' || (isAuthorized === true && initialRequest.loading)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg">در حال بارگذاری...</div>
        </div>
      </div>
    );
  }

  // Show unauthorized state
  if (isAuthorized === false) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg text-red-500">دسترسی غیرمجاز</div>
        </div>
      </div>
    );
  }

  // Render children when authorized and ready
  return <>{children}</>;
}
