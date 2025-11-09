import type { ReactNode } from 'react';
import { HomeLayout } from '@/features/home';

const HomeRouteLayout = ({ children }: { children: ReactNode }) => {
    return <HomeLayout>{children}</HomeLayout>;
};

export default HomeRouteLayout;
