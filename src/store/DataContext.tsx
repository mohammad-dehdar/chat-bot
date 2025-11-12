'use client';

import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import { useDataStore } from './data.store';

type DataContextValue = {
    pazireshList: unknown | null;
    ogrid: unknown | null;
    setPazireshList: (value: unknown | null) => void;
    setOgrid: (value: unknown | null) => void;
    reset: () => void;
};

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider = ({ children }: PropsWithChildren) => {
    const { pazireshList, ogrid, setPazireshList, setOgrid, reset } = useDataStore();

    const value = useMemo<DataContextValue>(
        () => ({
            pazireshList,
            ogrid,
            setPazireshList,
            setOgrid,
            reset,
        }),
        [pazireshList, ogrid, setPazireshList, setOgrid, reset],
    );

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextValue => {
    const ctx = useContext(DataContext);
    if (!ctx) {
        throw new Error('useData must be used within a DataProvider');
    }
    return ctx;
};
