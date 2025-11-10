"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TabProps } from "./types";
import { ArrowRightIcon } from "@/components/shared/icons";

export const Tab = ({
    items,
    defaultActiveId,
    className,
    tabClassName,
    contentClassName,
    onSelect,
}: TabProps) => {
    const [activeId, setActiveId] = useState<string>(
        defaultActiveId || items[0]?.id || ""
    );
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    const activeTab = items.find((item) => item.id === activeId);

    // ✅ استفاده از useCallback برای بهینه‌سازی
    const checkScrollability = useCallback(() => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 1
        );
    }, []);

    // ✅ مدیریت بهتر ResizeObserver
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        checkScrollability();

        // ✅ Cleanup قبلی observer
        if (resizeObserverRef.current) {
            resizeObserverRef.current.disconnect();
        }

        // ✅ ایجاد observer جدید
        resizeObserverRef.current = new ResizeObserver(() => {
            checkScrollability();
        });

        resizeObserverRef.current.observe(container);

        // ✅ Cleanup در unmount
        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
                resizeObserverRef.current = null;
            }
        };
    }, [items, checkScrollability]);

    // ✅ استفاده از useCallback برای scroll functions
    const scrollLeft = useCallback(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
            setTimeout(checkScrollability, 300);
        }
    }, [checkScrollability]);

    const scrollRight = useCallback(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
            setTimeout(checkScrollability, 300);
        }
    }, [checkScrollability]);

    // ✅ مدیریت بهتر tab selection
    const handleTabSelect = useCallback((item: typeof items[0]) => {
        setActiveId(item.id);
        onSelect?.(item);
    }, [onSelect]);

    return (
        <div className={className}>
            {/* نوار تب‌ها */}
            <div className="flex items-center gap-2 mb-2 rounded-sm h-9 bg-white shadow-inner">
                {/* دکمه اسکرول چپ */}
                <button
                    type="button"
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className={`
                        flex items-center justify-center
                        w-4 h-full rounded-r-sm
                        bg-[#00AFC2] text-white
                        transition-opacity
                        disabled:opacity-30 disabled:cursor-not-allowed
                        hover:bg-teal-600
                    `}
                    aria-label="اسکرول به چپ"
                >
                    <ArrowRightIcon className="w-2 h-2" />
                </button>

                {/* کانتینر اسکرول‌پذیر تب‌ها */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScrollability}
                    className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {items.map((item) => {
                        const isActive = item.id === activeId;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleTabSelect(item)}
                                className={`
                                    px-4 py-2 rounded
                                    text-xs font-medium shadow-md
                                    transition-colors whitespace-nowrap
                                    ${isActive
                                        ? "bg-gradient-to-t from-[#00AFC2] to-[#FFFFFF]"
                                        : "bg-gradient-to-t from-[#62F5FF] to-[#FFFFFF]"
                                    }
                                    ${tabClassName || ""}
                                `}
                                aria-selected={isActive}
                                role="tab"
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                {/* دکمه اسکرول راست */}
                <button
                    type="button"
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    className={`
                        flex items-center justify-center
                        w-4 h-full rounded-l-sm
                        bg-[#00AFC2] text-white
                        transition-opacity
                        disabled:opacity-30 disabled:cursor-not-allowed
                        hover:bg-teal-600
                    `}
                    aria-label="اسکرول به راست"
                >
                    <ArrowRightIcon className="w-2 h-2 rotate-180" />
                </button>
            </div>

            {/* محتوای تب فعال */}
            <div
                className={`${contentClassName || ""} rounded-sm h-28 bg-[#F9FAFB] shadow-inner`}
                role="tabpanel"
            >
                {activeTab ? (
                    activeTab.content
                ) : (
                    <p className="text-center text-slate-600 p-4">
                        برای نمایش اطلاعات برنامه درمانی از نوار بالا، یکی از برنامه‌ها را انتخاب کنید
                    </p>
                )}
            </div>
        </div>
    );
};