'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AddIcon, DIcon, SearchIcon } from '@icon';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        dir="rtl"
                        className="bg-sidebar w-full max-w-sm rounded-t-3xl p-5 shadow-xl"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <DIcon className="h-6 w-6 text-foreground" />
                                <span className="text-base font-semibold text-foreground">منوی گفتگو</span>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-foreground/5 text-foreground relative flex h-10 w-10 items-center justify-center rounded-full border border-divider transition-all hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar focus-visible:ring-accent/50"
                                aria-label="بستن منو"
                            >
                                <span className="sr-only">بستن</span>
                                <span className="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 transform rounded-full bg-foreground" />
                                <span className="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform rounded-full bg-foreground" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <label className="text-foreground/70 block text-sm font-medium">جستجو</label>
                            <div className="bg-surface flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sm">
                                <SearchIcon className="h-5 w-5 text-muted" />
                                <input
                                    type="text"
                                    placeholder="عبارت مورد نظر را جستجو کنید"
                                    className="text-foreground placeholder:text-muted flex-1 bg-transparent text-right focus-visible:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                className="bg-foreground/10 text-foreground flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all hover:bg-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar focus-visible:ring-accent/50"
                            >
                                <AddIcon className="h-4 w-4 text-muted" />
                                گفت و گو جدید
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
