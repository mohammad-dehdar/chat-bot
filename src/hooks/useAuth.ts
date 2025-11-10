'use client';

import { useEffect, useState } from 'react';
import checkToken, { handlePostMessage } from '@/services/checkToken';
import { env } from '@/config/env';

export function useAuth() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | string>('loading');

  useEffect(() => {
    checkToken(env.NODE_ENV, (val) => setIsAuthorized(val));
    return () => {
      window.removeEventListener('message', (e) =>
        handlePostMessage(e, (val) => setIsAuthorized(val))
      );
      // Don't clear localStorage on unmount - keep token for session
    };
  }, []);

  return isAuthorized;
}
