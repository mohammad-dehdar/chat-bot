'use client';

import { useChatStore } from '@/features/home/store';

import { ProgramDropdown } from './program-dropdown';

export const HomeHeader = () => {
    const hasInteracted = useChatStore((state) => state.hasInteracted);

    if (!hasInteracted) {
        return null;
    }

    return (
        <header className="flex items-center justify-center border-b border-divider bg-foreground/5 backdrop-blur px-6">
            <ProgramDropdown className="w-xl" />
        </header>
    );
};
