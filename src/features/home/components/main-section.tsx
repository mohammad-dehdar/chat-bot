'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { Input } from '@/components/ui';
import { ArrowDownIcon, SendMessageIcon } from '@icon';

const HERO_HEADER_HEIGHT = 132;

const springTransition = {
    duration: 0.55,
    timingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

export const MainSection = () => {
    const [isHeroExpanded, setIsHeroExpanded] = useState(false);

    const originalOverflowRef = useRef<string | null>(null);

    useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }

        if (!isHeroExpanded) {
            if (originalOverflowRef.current !== null) {
                document.body.style.overflow = originalOverflowRef.current;
                originalOverflowRef.current = null;
            }
            return;
        }

        originalOverflowRef.current = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            if (originalOverflowRef.current !== null) {
                document.body.style.overflow = originalOverflowRef.current;
                originalOverflowRef.current = null;
            }
        };
    }, [isHeroExpanded]);

    const heroPosition = useMemo(() => {
        if (isHeroExpanded) {
            return {
                top: '50%',
                transform: 'translate(-50%, -50%) scale(1)',
                boxShadow: '0 28px 80px -30px rgba(15, 23, 42, 0.55)',
            } as const;
        }

        return {
            top: `${Math.max(24, HERO_HEADER_HEIGHT / 2)}px`,
            transform: 'translate(-50%, -50%) scale(0.92)',
            boxShadow: '0 18px 48px -28px rgba(15, 23, 42, 0.45)',
        } as const;
    }, [isHeroExpanded]);

    return (
        <main className="relative flex h-screen flex-1 flex-col overflow-hidden">
            {isHeroExpanded ? (
                <button
                    type="button"
                    className="fixed inset-0 z-20 bg-slate-950/40 backdrop-blur-sm transition-opacity"
                    aria-label="بستن کارت معرفی"
                    onClick={() => setIsHeroExpanded(false)}
                />
            ) : null}

            <header className="relative z-10 bg-white/10" style={{ height: HERO_HEADER_HEIGHT }} />

            <div className="pointer-events-none absolute inset-0 z-30 flex justify-center">
                <div
                    style={{
                        left: '50%',
                        top: heroPosition.top,
                        transform: heroPosition.transform,
                        boxShadow: heroPosition.boxShadow,
                        transition: `transform ${springTransition.duration}s ${springTransition.timingFunction}, top ${springTransition.duration}s ${springTransition.timingFunction}, box-shadow ${springTransition.duration}s ${springTransition.timingFunction}`,
                    }}
                    className="pointer-events-auto w-full max-w-xl origin-top rounded-3xl border border-white/10 bg-gradient-to-br from-white/90 via-white/80 to-white/60 p-6 text-left text-slate-900 backdrop-blur-xl"
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-500">دستیار هوشمند</p>
                            <h2 className="text-2xl font-semibold text-slate-900">سلام! آماده‌ام تا گفتگو را شروع کنیم.</h2>
                            <p className="text-sm leading-6 text-slate-600">
                                با یک کلیک، کارت معرفی به وسط صفحه می‌آید و فضای مکالمه برای شما فراهم می‌شود.
                            </p>
                            <div className="flex flex-wrap items-center gap-3 pt-3">
                                <button
                                    type="button"
                                    className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                                    onClick={() => setIsHeroExpanded(true)}
                                >
                                    شروع گفتگو
                                </button>
                                <span className="text-xs font-medium text-slate-500">پاسخ‌های سریع، شخصی‌سازی شده و فارسی.</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={[
                                'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
                                'bg-slate-900 text-white shadow-lg',
                                'transition-all duration-300 hover:bg-slate-800',
                            ].join(' ')}
                            aria-label={isHeroExpanded ? 'بازگرداندن کارت به هدر' : 'نمایش کارت در وسط صفحه'}
                            aria-expanded={isHeroExpanded}
                            onClick={() => setIsHeroExpanded((prev) => !prev)}
                        >
                            <ArrowDownIcon className={`h-5 w-5 transition-transform duration-300 ${isHeroExpanded ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex-1 space-y-4 overflow-y-auto p-6">
                <div className="flex h-full items-center justify-center text-center text-slate-400">
                    <p>در انتظار پیام جدید...</p>
                </div>
            </div>

            <div className="relative z-10 bg-white/10 p-6">
                <div className="flex h-11 items-center gap-2">
                    <div className="flex h-12 flex-1 items-center gap-4 rounded-full border border-accent bg-input shadow-lg">
                        <div className="">
                            <div className="rounded-full bg-white/10 p-4">
                                <SendMessageIcon className="text-muted" />
                            </div>
                        </div>
                        <Input
                            type="text"
                            className="flex-1 bg-transparent pr-4 text-right text-slate-900 placeholder:text-muted"
                            placeholder="پیام خود را بنویسید..."
                            dir="rtl"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};
