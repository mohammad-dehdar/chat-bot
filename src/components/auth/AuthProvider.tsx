'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useInitialRequest } from '@/hooks/useInitialRequest';

interface AuthProviderProps {
  children: ReactNode;
}

type LoadingState = 'idle' | 'authenticating' | 'loading-data' | 'ready' | 'error';

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthorized = useAuth();
  const initialRequest = useInitialRequest();
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (isAuthorized === 'loading') {
      setLoadingState('authenticating');
      return;
    }

    if (isAuthorized === false) {
      setLoadingState('error');
      setErrorMessage('دسترسی غیرمجاز');
      return;
    }

    if (isAuthorized === true) {
      if (initialRequest.loading) {
        setLoadingState('loading-data');
      } else if (initialRequest.error) {
        setLoadingState('error');
        setErrorMessage(
          typeof initialRequest.error === 'string'
            ? initialRequest.error
            : 'خطا در بارگذاری اطلاعات اولیه'
        );
      } else {
        setLoadingState('ready');
      }
    }
  }, [isAuthorized, initialRequest.loading, initialRequest.error]);

  // ✅ Loading screen با پیام‌های مناسب
  if (loadingState === 'authenticating' || loadingState === 'loading-data') {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <div className="text-lg text-white">
            {loadingState === 'authenticating'
              ? 'در حال احراز هویت...'
              : 'در حال بارگذاری اطلاعات...'}
          </div>
        </div>
      </div>
    );
  }

  // ✅ Error screen با دکمه retry
  if (loadingState === 'error') {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="text-6xl">⚠️</div>
          <div className="text-xl text-red-400 font-bold">خطا</div>
          <div className="text-slate-300">{errorMessage}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  // ✅ Render children when ready
  return <>{children}</>;
}