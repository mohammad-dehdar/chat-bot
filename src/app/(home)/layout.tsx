import HomeLayout from '@/features/home/layout';
import type { ReactNode } from 'react';

const HomeRouteLayout = ({ children }: { children: ReactNode }) => {
    return <HomeLayout>{children}</HomeLayout>;
};

export default HomeRouteLayout;
