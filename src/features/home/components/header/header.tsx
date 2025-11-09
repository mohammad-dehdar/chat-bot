'use client';

import { useChatStore } from '@/features/home/store';

import { ProgramDropdown } from './program-dropdown';

export const HomeHeader = () => {
    const hasInteracted = useChatStore((state) => state.hasInteracted);

    if (!hasInteracted) {
        return null;
    }

    return (
        <header className="flex items-center justify-center border-b border-divider bg-white/10 px-6 backdrop-blur">
            <ProgramDropdown className="w-xl" />
        </header>
    );
};
