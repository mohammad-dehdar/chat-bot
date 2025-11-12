'use client';

import { ProgramDropdown } from './ProgramDropdown';
import { useChatStore } from '../state/chat-store';

interface HomeHeaderProps {
    className?: string;
}

export function HomeHeader({ className }: HomeHeaderProps = {}) {
    const hasInteracted = useChatStore((state) => state.hasInteracted);

    if (!hasInteracted) {
        return null;
    }

    return (
        <header
            className={`border-divider bg-foreground/5 flex items-center justify-center border-b px-6 backdrop-blur ${className ?? ''}`.trim()}
        >
            <ProgramDropdown className="w-xl" />
        </header>
    );
}
