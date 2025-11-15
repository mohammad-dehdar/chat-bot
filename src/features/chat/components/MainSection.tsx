"use client";

import { Suspense } from 'react';
import Image from 'next/image';
import { Skeleton } from 'antd';

import { Button, MessageBubble } from '@/shared/ui';
import bgVector1 from '@/shared/assets/icons/Group-1.svg';
import bgVector2 from '@/shared/assets/icons/Group-2.svg';
import { UserIcon } from '@icon';

import { useChatStore } from '../hooks/useChatStore';
import { MessageComposer } from '../ui/MessageComposer';
import { ProgramDropdown } from '../ui/ProgramDropdown';
import { HomeHeader } from './HomeHeader';

interface MainSectionProps {
    onOpenMobileSidebar?: () => void;
}

const dropdownFallback = (
    <Skeleton.Node active className="h-32 w-full rounded-2xl bg-background/50">
        <div className="flex h-full items-center justify-center text-xs text-muted">در حال بارگذاری...</div>
    </Skeleton.Node>
);

export function MainSection({ onOpenMobileSidebar }: MainSectionProps) {
    const hasInteracted = useChatStore((state) => state.hasInteracted);
    const messages = useChatStore((state) => state.messages);
    const sendUserMessage = useChatStore((state) => state.sendUserMessage);

    return (
        <main className="relative flex min-h-screen flex-1 flex-col md:h-screen">
            {onOpenMobileSidebar ? (
                <div className="border-divider bg-foreground/5 sticky top-0 z-40 flex items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur md:hidden">
                    <Button
                        type="text"
                        rounded="full"
                        aria-label="باز کردن منو"
                        onClick={onOpenMobileSidebar}
                        className="bg-foreground/5 relative flex h-10 w-10 items-center justify-center border border-divider text-foreground hover:bg-foreground/10"
                    >
                        <span className="sr-only">باز کردن منو</span>
                        <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
                            <span className="block h-0.5 w-6 rounded-full bg-foreground" />
                            <span className="block h-0.5 w-6 rounded-full bg-foreground" />
                            <span className="block h-0.5 w-6 rounded-full bg-foreground" />
                        </span>
                    </Button>

                    <div className="flex flex-1 justify-end text-right">
                        {hasInteracted ? (
                            <Suspense fallback={dropdownFallback}>
                                <ProgramDropdown className="w-full max-w-[220px]" />
                            </Suspense>
                        ) : (
                            <span className="text-base font-semibold text-foreground">دستیار سلامت</span>
                        )}
                    </div>
                </div>
            ) : null}
            <HomeHeader className="hidden md:flex" />

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <Image
                    src={bgVector1}
                    alt="vector"
                    width={500}
                    height={500}
                    priority
                    className="absolute -left-40 -top-20 -z-50 hidden lg:block"
                    style={{ width: 'auto', height: 'auto' }}
                />
                <Image
                    src={bgVector2}
                    alt="vector"
                    width={500}
                    height={500}
                    priority
                    className="absolute -right-40 -bottom-20 -z-50 hidden lg:block"
                    style={{ width: 'auto', height: 'auto' }}
                />
                {hasInteracted ? (
                    messages.length > 0 ? (
                        <ul className="flex flex-col gap-3">
                            {messages.map((chatMessage) => (
                                <li key={chatMessage.id} className="flex items-start justify-start gap-3">
                                    <div className="bg-surface-muted flex h-12 w-12 flex-shrink-0 items-end justify-center overflow-hidden rounded-full p-0.5 ring-4 ring-accent/20">
                                        <UserIcon className="h-9 w-9 overflow-hidden rounded-full text-muted" />
                                    </div>
                                    <MessageBubble text={chatMessage.text} role={chatMessage.role} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted">
                            برای شروع گفتگو یک پیام ارسال کنید.
                        </div>
                    )
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <Suspense fallback={dropdownFallback}>
                            <ProgramDropdown className="w-full max-w-xl" />
                        </Suspense>
                    </div>
                )}
            </div>

            <div className="border-divider bg-foreground/5 backdrop-blur-sm border-t p-4 md:p-6">
                <MessageComposer onSubmit={sendUserMessage} />
            </div>
        </main>
    );
}
