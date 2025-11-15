'use client';

import { useCallback, useState } from 'react';

import { MainSection } from './MainSection';
import { MobileSidebar } from './MobileSidebar';
import { Sidebar } from './Sidebar';

export function HomePage() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleOpenMobileSidebar = useCallback(() => setIsMobileSidebarOpen(true), []);
    const handleCloseMobileSidebar = useCallback(() => setIsMobileSidebarOpen(false), []);

    return (
        <>
            <Sidebar className="hidden md:flex" />
            <MainSection onOpenMobileSidebar={handleOpenMobileSidebar} />
            <MobileSidebar isOpen={isMobileSidebarOpen} onClose={handleCloseMobileSidebar} />
        </>
    );
}
