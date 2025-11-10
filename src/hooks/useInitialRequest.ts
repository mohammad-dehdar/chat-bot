'use client';

import { useEffect, useState } from 'react';
import { request } from '@/services';
import { INITIAL_JobId } from '@/constants/jobId';

interface InitialRequestState {
  loading: boolean;
  data: unknown | null;
  error: boolean | string | null;
}

export function useInitialRequest() {
  const [state, setState] = useState<InitialRequestState>({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const makeInitialRequest = async () => {
      try {
        const response = await request({
          jobId: INITIAL_JobId,
          dataInfo: {},
        });

        if (response.error === false) {
          // Store the key from response
          if (response.data) {
            localStorage.setItem('initialKey', JSON.stringify(response.data));
          }
          setState({
            loading: false,
            data: response.data,
            error: null,
          });
        } else {
          setState({
            loading: false,
            data: null,
            error: response.error,
          });
        }
      } catch (error) {
        setState({
          loading: false,
          data: null,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    // Only make request if token exists
    const token = localStorage.getItem('token');
    if (token) {
      makeInitialRequest();
    } else {
      setState({
        loading: false,
        data: null,
        error: 'No token available',
      });
    }
  }, []);

  return state;
}
