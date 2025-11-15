'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Button } from '@/shared/ui';
import { ChevronDownIcon } from '@icon';

import { fetchPrograms } from '../api/programs';
import { useChatStore } from '../hooks/useChatStore';

interface ProgramDropdownProps {
    className?: string;
}

export function ProgramDropdown({ className }: ProgramDropdownProps) {
    const { data: programs } = useSuspenseQuery({
        queryKey: ['chat-programs'],
        queryFn: fetchPrograms,
        staleTime: 1000 * 60 * 5,
    });
    const sendProgramMessage = useChatStore((state) => state.sendProgramMessage);
    const [isOpen, setIsOpen] = useState(true);
    const [activeProgramId, setActiveProgramId] = useState(() => programs[0]?.id ?? '');

    const handleSelect = (programId: string) => {
        setActiveProgramId(programId);
        const program = programs.find((item) => item.id === programId);
        if (program) {
            sendProgramMessage(program.label);
        }
    };

    const activeProgram = programs.find((program) => program.id === activeProgramId) ?? programs[0];

    return (
        <div className={`relative w-full overflow-visible ${className ?? ''}`.trim()}>
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2">
                <Image
                    src="/img/awake-bot.svg"
                    alt="AwakeBot"
                    width={160}
                    height={197}
                    priority
                    className="h-auto w-auto"
                />
            </div>
            <Card className="relative z-10 w-full rounded-3xl border-none bg-background/90 shadow-[0px_8px_32px_rgba(15,23,42,0.08)]">
                <div className="space-y-4 text-right">
                    <div className="flex items-center justify-between">
                        <Typography.Title level={5} className="!mb-0 text-sm font-semibold text-foreground">
                            برنامه های درمانی شما
                        </Typography.Title>
                        <Button
                            type="text"
                            rounded="full"
                            htmlType="button"
                            aria-label="باز و بسته کردن"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="text-accent"
                        >
                            <ChevronDownIcon
                                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </Button>
                    </div>

                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                key="program-dropdown-content"
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="space-y-3"
                            >
                                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                                    {programs.map((program) => {
                                        const isActive = program.id === activeProgramId;
                                        return (
                                            <Button
                                                key={program.id}
                                                type="text"
                                                rounded="full"
                                                htmlType="button"
                                                onClick={() => handleSelect(program.id)}
                                                className={`text-xs font-medium shadow-md transition-all ${
                                                    isActive
                                                        ? 'bg-accent/20 border border-accent text-foreground'
                                                        : 'bg-surface text-foreground hover:bg-accent/10'
                                                }`}
                                            >
                                                {program.label}
                                            </Button>
                                        );
                                    })}
                                </div>

                                <div className="rounded-2xl bg-surface p-4 shadow-inner">
                                    <Typography.Paragraph className="mb-0 text-sm leading-relaxed text-foreground">
                                        {activeProgram?.description}
                                    </Typography.Paragraph>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>
        </div>
    );
}
