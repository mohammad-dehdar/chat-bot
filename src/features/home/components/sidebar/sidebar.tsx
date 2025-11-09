'use client';

import { Button, Input } from '@/components/ui';
import { AddIcon, Dicon, SearchIcon } from '@icon';
import { useEffect, useRef, useState } from 'react';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const floatingSearchRef = useRef<HTMLInputElement | null>(null);

    const toggleSidebar = () => {
        setIsOpen((prev) => {
            const nextState = !prev;
            if (nextState) {
                setIsSearchOpen(false);
            }
            return nextState;
        });
    };

    useEffect(() => {
        if (isSearchOpen && floatingSearchRef.current) {
            floatingSearchRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleCollapsedSearchClick = () => {
        if (!isOpen) {
            setIsSearchOpen(true);
        }
    };

    return (
        <aside
            className={`relative h-screen border-l border-divider bg-sidebar flex flex-col transition-[width] duration-300 ease-in-out ${isOpen ? 'w-60' : 'w-16'
                }`}
        >
            <div className={`p-2 flex items-center ${isOpen ? 'justify-end' : 'justify-center'}`}>
                <Button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg transition-colors hover:bg-surface"
                    aria-label={isOpen ? 'بستن سایدبار' : 'باز کردن سایدبار'}
                    type="button"
                    icon={<Dicon />}
                />
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-4">
                <div className="relative">
                    <div
                        className={`flex items-center gap-2 rounded-2xl bg-surface shadow-sm transition-all duration-200 ${isOpen ? 'px-3 py-2' : 'justify-center p-2'
                            }`}
                    >
                        <SearchIcon className="text-muted" />
                        {isOpen && (
                            <Input
                                type="text"
                                placeholder="جستجو"
                                className="bg-transparent text-right placeholder:text-muted"
                            />
                        )}
                    </div>

                    {!isOpen && (
                        <Button
                            type="button"
                            className="absolute inset-0"
                            aria-label="جستجو"
                            onClick={handleCollapsedSearchClick}
                        >
                            <span className="sr-only">جستجو</span>
                        </Button>
                    )}

                    {!isOpen && isSearchOpen && (
                        <div className="absolute left-full top-0 z-10 ml-3 w-56 rounded-2xl bg-surface p-3 shadow-lg">
                            <Input
                                ref={floatingSearchRef}
                                type="text"
                                placeholder="جستجو"
                                className="rounded-xl border border-divider bg-white/40 px-3 py-2 text-right placeholder:text-muted"
                                onBlur={() => setIsSearchOpen(false)}
                            />
                        </div>
                    )}
                </div>

                <Button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded-2xl bg-surface font-semibold shadow-sm transition-all duration-200 ${isOpen ? 'justify-start px-3 py-2' : 'justify-center p-2'
                        }`}
                    title="گفتگوی جدید"
                    icon={<AddIcon className="text-muted" />}
                >
                    {isOpen && <span>گفتگوی جدید</span>}
                </Button>
            </div>
        </aside>
    );
};
