import { create } from '@/shared/lib/zustand';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthActions = {
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setError: (message: string | null) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setAuthenticated: (value) => set({ isAuthenticated: value, error: null }),
  setLoading: (value) => set({ isLoading: value }),
  setError: (message) => set({ error: message, isLoading: false }),
  reset: () => set({ isAuthenticated: false, isLoading: false, error: null }),
}));
