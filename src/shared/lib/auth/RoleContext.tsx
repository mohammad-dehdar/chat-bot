/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { createContext, useContext, useEffect, useMemo, type PropsWithChildren } from 'react';
import { defaultFetchRole, type FetchRoleResult } from './role.service';
import { useRoleStore } from './role.store';

type RoleContextValue = {
    roleCode: string | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

type RoleProviderProps = PropsWithChildren<{
    fetchRole?: () => Promise<FetchRoleResult>;
    autoLoad?: boolean;
}>;

export const RoleProvider = ({ children, fetchRole = defaultFetchRole, autoLoad = true }: RoleProviderProps) => {
    const { roleCode, loading, error, setLoading, setRole, setError } = useRoleStore();

    const refresh = async () => {
        setLoading(true);
        setError(null);
        const { roleCode: code, error: err } = await fetchRole();
        if (err) {
            setError(err);
            setRole(null);
        } else {
            setRole(code ?? null);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (autoLoad && !loading && roleCode === null) {
            void refresh();
        }
    }, []);

    const value = useMemo<RoleContextValue>(
        () => ({
            roleCode,
            loading,
            error,
            refresh,
        }),
        [roleCode, loading, error],
    );

    return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = (): RoleContextValue => {
    const ctx = useContext(RoleContext);
    if (!ctx) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return ctx;
};
