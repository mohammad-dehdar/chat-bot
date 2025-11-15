'use client';

import { useState, type PropsWithChildren } from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RoleProvider } from '@/shared/lib/auth/RoleContext';
import { DataProvider } from '@/shared/lib/state/DataContext';
import { AntdTheme } from '@/shared/ui/AntdTheme';

const AppProviders = ({ children }: PropsWithChildren) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60,
                        refetchOnWindowFocus: false,
                        suspense: true,
                    },
                },
            }),
    );

    return (
        <StyleProvider hashPriority="high">
            <ConfigProvider direction="rtl" theme={AntdTheme} componentSize="large">
                <AntApp>
                    <QueryClientProvider client={queryClient}>
                        <RoleProvider>
                            <DataProvider>{children}</DataProvider>
                        </RoleProvider>
                    </QueryClientProvider>
                </AntApp>
            </ConfigProvider>
        </StyleProvider>
    );
};

export default AppProviders;
