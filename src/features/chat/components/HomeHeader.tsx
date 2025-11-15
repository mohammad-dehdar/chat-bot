'use client';

import { Suspense } from 'react';
import { Skeleton } from 'antd';

import { useChatStore } from '../hooks/useChatStore';
import { ProgramDropdown } from '../ui/ProgramDropdown';

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
            <Suspense
                fallback={
                    <Skeleton.Node active className="h-32 w-full max-w-xl rounded-2xl bg-background/50">
                        <div className="flex h-full items-center justify-center text-xs text-muted">در حال بارگذاری...</div>
                    </Skeleton.Node>
                }
            >
                <ProgramDropdown className="w-xl" />
            </Suspense>
        </header>
    );
}
