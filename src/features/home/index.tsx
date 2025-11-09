import type { PropsWithChildren } from 'react';
import { MainSection, Sidebar } from './components';

export const HomePage = () => {
    return (
        <>
            <Sidebar />
            <MainSection />
        </>
    );
};

export { default as HomeLayout } from './layout';

export type HomeLayoutProps = PropsWithChildren;
