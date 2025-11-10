import axios, { type AxiosResponse } from 'axios';
import { getBaseURL } from '@/config/config';
import { bToA } from '@/utils/helpers';

interface RequestParams {
  jobId: number;
  dataInfo?: Record<string, unknown>;
}

interface ApiResponse {
  error: boolean;
  data?: unknown;
  message?: string;
}

export const request = async ({ jobId, dataInfo = {} }: RequestParams): Promise<ApiResponse> => {
  const formData = new FormData();

  // If oi (order identifier) starts with "file_", remove the prefix
  if (dataInfo.oi && typeof dataInfo.oi === 'string' && dataInfo.oi.startsWith('file_')) {
    dataInfo.oi = dataInfo.oi.replace(/^file_/, '');
  }

  for (const key in dataInfo) {
    if (key.startsWith('file_')) {
      const originalFileKey = key.replace('file_', '');
      // Add file to FormData
      formData.append(key, dataInfo[key] as Blob);
      // Remove original key from dataInfo
      delete dataInfo[originalFileKey];
      // Keep file_ key in dataInfo with null value
      dataInfo[key] = null;
    }
  }

  const token = localStorage.getItem('token');
  const detailBase64 = dataInfo ? bToA(dataInfo) : bToA({});

  formData.append('detail', detailBase64);
  formData.append('jobId', `${jobId}`);
  formData.append('token', `${token}`);
  formData.append('gwt', GWT);

  const response: AxiosResponse<ApiResponse> = await axios({
    method: 'POST',
    url: getBaseURL(),
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
