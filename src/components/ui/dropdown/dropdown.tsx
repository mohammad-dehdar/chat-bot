'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import { ChevronDownIcon } from '@icon';

export interface DropdownProps {
    label: ReactNode;
    children: ReactNode;
    className?: string;
    buttonClassName?: string;
    panelClassName?: string;
    contentClassName?: string;
}

export const Dropdown = ({
    label,
    children,
    className,
    buttonClassName,
    panelClassName,
    contentClassName,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (containerRef.current && !containerRef.current.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const containerClassName = ['relative inline-block text-right', className].filter(Boolean).join(' ');
    const triggerClassName = [
        'flex items-center gap-2 rounded-xl border border-divider bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:bg-white',
        buttonClassName,
    ]
        .filter(Boolean)
        .join(' ');

    const panelClassNames = [
        'absolute left-0 mt-3 min-w-[240px] origin-top-left rounded-2xl border border-divider bg-surface/95 shadow-xl transition-all duration-200',
        isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
        panelClassName,
    ]
        .filter(Boolean)
        .join(' ');

    const contentClasses = ['max-h-80 overflow-auto p-4', contentClassName].filter(Boolean).join(' ');

    return (
        <div ref={containerRef} className={containerClassName}>
            <button
                type="button"
                onClick={toggleDropdown}
                className={triggerClassName}
                aria-haspopup="menu"
                aria-expanded={isOpen}
            >
                <span>{label}</span>
                <ChevronDownIcon
                    className={`h-4 w-4 text-muted transition-transform duration-200 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>

            <div role="menu" className={panelClassNames}>
                <div className={contentClasses}>{children}</div>
            </div>
        </div>
    );
};
