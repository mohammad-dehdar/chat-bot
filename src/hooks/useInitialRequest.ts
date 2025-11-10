'use client';

import { useEffect, useState } from 'react';
import { request } from '@/services';
import { FIRST_RELOAD_JobId, INITIAL_JobId } from '@/constants/jobId';

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
        // Step 1: First request to job-id 28 to get the actual job-id (6483)
        const firstResponse = await request({
          jobId: FIRST_RELOAD_JobId,
          dataInfo: {},
        });

        if (firstResponse.error === false && firstResponse.data) {
          // Extract job-id 6483 from response
          let actualJobId = INITIAL_JobId; // Default fallback

          // Try to extract job-id from response data
          if (typeof firstResponse.data === 'object' && firstResponse.data !== null) {
            const data = firstResponse.data as Record<string, unknown>;
            // Check common possible keys for job-id
            if (typeof data.jobId === 'number') {
              actualJobId = data.jobId;
            } else if (typeof data.job_id === 'number') {
              actualJobId = data.job_id;
            } else if (typeof data.id === 'number') {
              actualJobId = data.id;
            }
          } else if (typeof firstResponse.data === 'number') {
            actualJobId = firstResponse.data;
          }

          // Use the extracted job-id (should be 6483) or fallback to INITIAL_JobId
          // Step 2: Make request with the actual job-id (6483)
          const secondResponse = await request({
            jobId: actualJobId,
            dataInfo: {},
          });

          if (secondResponse.error === false) {
            // Store the key from response
            if (secondResponse.data) {
              localStorage.setItem('initialKey', JSON.stringify(secondResponse.data));
            }
            setState({
              loading: false,
              data: secondResponse.data,
              error: null,
            });
          } else {
            setState({
              loading: false,
              data: null,
              error: secondResponse.error,
            });
          }
        } else {
          setState({
            loading: false,
            data: null,
            error: firstResponse.error,
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
