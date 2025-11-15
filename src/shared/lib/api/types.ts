export type ApiResponse<T = unknown> = {
  error: boolean;
  data?: T;
  message?: string;
};

export type RequestConfig = {
  jobId: string | number;
  dataInfo?: Record<string, unknown>;
  signal?: AbortSignal;
  token?: string;
  gwt?: string | null;
};
