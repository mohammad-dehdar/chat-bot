'use client';

import { useBoolean } from '@/shared/hooks';

import { MainSection } from './MainSection';
import { MobileSidebar } from './MobileSidebar';
import { Sidebar } from './Sidebar';

export function HomePage() {
    const mobileSidebar = useBoolean(false);

    return (
        <>
            <Sidebar className="hidden md:flex" />
            <MainSection onOpenMobileSidebar={mobileSidebar.setTrue} />
            <MobileSidebar isOpen={mobileSidebar.value} onClose={mobileSidebar.setFalse} />
        </>
    );
}
