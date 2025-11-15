import type { PropsWithChildren } from 'react';

const HomeLayout = ({ children }: PropsWithChildren) => {
    return <div className="flex min-h-screen flex-col overflow-hidden md:h-screen md:flex-row">{children}</div>;
};

export default HomeLayout;