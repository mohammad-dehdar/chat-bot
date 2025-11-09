import type { PropsWithChildren } from 'react';

const HomeLayout = ({ children }: PropsWithChildren) => {
    return <div className="flex h-screen overflow-hidden">{children}</div>;
};

export default HomeLayout;
