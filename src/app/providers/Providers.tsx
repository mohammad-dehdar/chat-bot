'use client';

import type { PropsWithChildren } from 'react';
import { RoleProvider } from '@/lib/auth/RoleContext';
import { DataProvider } from '@/features/data/DataContext';

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <RoleProvider>
            <DataProvider>{children}</DataProvider>
        </RoleProvider>
    );
};

export default Providers;
