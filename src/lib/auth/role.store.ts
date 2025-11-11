import { create } from "@/lib/zustand";
import type { RoleCode } from "./role.service";

type RoleState = {
  roleCode: RoleCode;
  loading: boolean;
  error: string | null;
};

type RoleActions = {
  setLoading: (loading: boolean) => void;
  setRole: (role: RoleCode) => void;
  setError: (message: string | null) => void;
  reset: () => void;
};

export const useRoleStore = create<RoleState & RoleActions>((set) => ({
  roleCode: null,
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setRole: (role) => set({ roleCode: role }),
  setError: (message) => set({ error: message }),
  reset: () => set({ roleCode: null, loading: false, error: null }),
}));
