"use client";

import { useEffect, useRef, useState } from "react";
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

    const activeTab = items.find((item) => item.id === activeId);

    const checkScrollability = () => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth
        );
    };

    useEffect(() => {
        const checkScroll = () => {
            if (!scrollContainerRef.current) return;
            const container = scrollContainerRef.current;
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth
            );
        };

        checkScroll();
        const container = scrollContainerRef.current;
        if (container) {
            const resizeObserver = new ResizeObserver(checkScroll);
            resizeObserver.observe(container);
            return () => resizeObserver.disconnect();
        }
    }, [items]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
            setTimeout(checkScrollability, 300);
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
            setTimeout(checkScrollability, 300);
        }
    };

    return (
        <div className={className}>
            <div className="flex items-center gap-2 mb-2 rounded-sm h-9 bg-background shadow-inner">
                <button
                    type="button"
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className="flex items-center justify-center w-4 h-full rounded-r-sm bg-accent text-background transition-opacity disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80"
                    aria-label="اسکرول به چپ"
                >
                    <ArrowRightIcon className="w-2 h-2" />
                </button>

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
                                onClick={() => {
                                    setActiveId(item.id);
                                    onSelect?.(item);
                                }}
                                className={`px-4 py-2 rounded text-xs font-medium shadow-md transition-all whitespace-nowrap ${isActive
                                        ? "bg-accent/20 border border-accent text-foreground"
                                        : "bg-surface text-foreground hover:bg-accent/10"
                                    } ${tabClassName || ""}`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    className="flex items-center justify-center w-4 h-full rounded-l-sm bg-accent text-background transition-opacity disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80"
                    aria-label="اسکرول به راست"
                >
                    <ArrowRightIcon className="w-2 h-2 rotate-180" />
                </button>
            </div>

            <div className={`${contentClassName || ""} rounded-sm h-28 bg-surface shadow-inner`}>
                {activeTab ? (
                    activeTab.content
                ) : (
                    <p className="text-center text-muted p-4">
                        برای نمایش اطلاعات برنامه درمانی از نوار بالا، یکی از برنامه‌ها را انتخاب کنید
                    </p>
                )}
            </div>
        </div>
    );
};