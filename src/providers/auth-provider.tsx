"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useCallback,
    type PropsWithChildren,
} from "react";
import { authenticate, clearAuth, type AuthConfig } from "@/lib/auth/use-client";
import { useAuthStore } from "@/lib/auth/auth-store";

type AuthContextValue = {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = PropsWithChildren<{
    config: AuthConfig;
    autoAuth?: boolean;
}>;

export function AuthProvider({
    children,
    config,
    autoAuth = true,
}: AuthProviderProps) {
    const {
        isAuthenticated,
        isLoading,
        error,
        setAuthenticated,
        setLoading,
        setError,
        reset,
    } = useAuthStore();

    const { mode, authJobId, devToken } = config;

    useEffect(() => {
        if (!autoAuth || isLoading || isAuthenticated) return;

        const runAuth = async () => {
            setLoading(true);
            const result = await authenticate({ mode, authJobId, devToken });

            if (result.success) {
                setAuthenticated(true);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };

        void runAuth();
    }, [
        autoAuth,
        isAuthenticated,
        isLoading,
        mode,
        authJobId,
        devToken,
        setAuthenticated,
        setError,
        setLoading,
    ]);

    const logout = useCallback(() => {
        clearAuth();
        reset();
    }, [reset]);

    const value = useMemo<AuthContextValue>(
        () => ({
            isAuthenticated,
            isLoading,
            error,
            logout,
        }),
        [isAuthenticated, isLoading, error, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}
