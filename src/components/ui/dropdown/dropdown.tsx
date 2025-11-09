"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export interface DropdownProps {
    label: ReactNode // این لیبل دیگر نمایش داده نمی‌شود اما در تعریف باقی می‌ماند
    children: ReactNode
    className?: string
    buttonClassName?: string // برای دکمه باز و بسته کردن
    panelClassName?: string // برای پنل محتوا
    contentClassName?: string // برای محتوای داخلی پنل
    onClose?: () => void
}

export const Dropdown = ({
    children,
    className,
    buttonClassName,
    panelClassName,
    contentClassName,
    onClose,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)

    // منطق بسته شدن با کلیک خارج از منو
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            // فقط زمانی که باز است و خارج از کلیک می‌شود، بسته شود
            if (isOpen && containerRef.current && !containerRef.current.contains(target)) {
                setIsOpen(false)
                onClose?.()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen, onClose])

    // منطق بسته شدن با کلید Escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false)
                onClose?.()
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev)
    }

    // کلاس‌دهی برای کانتینر اصلی
    const containerClassName = ["relative rounded-sm w-full overflow-hidden bg-white", className,
        // اعمال shadow و glow برای حالت باز
        isOpen ? "shadow-lg shadow-blue-200/50" : "shadow-md"
    ].filter(Boolean).join(" ")

    // کلاس‌دهی برای پنل محتوا (برای اسلاید کشویی)
    const panelClassNames = [
        "overflow-hidden transition-all duration-300 ease-in-out origin-top",
        // max-h-screen/max-h-0 برای ایجاد انیمیشن کشویی
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        panelClassName,
    ]
        .filter(Boolean)
        .join(" ")

    // کلاس‌دهی برای محتوای داخلی پنل
    const contentClasses = ["w-full p-1 pb-0", contentClassName].filter(Boolean).join(" ")

    // کلاس‌دهی برای دکمه باز و بسته کردن (که حالا همیشه در پایین محتوا قرار می‌گیرد)
    const triggerClassName = [
        "flex bg-sidebar items-center justify-center w-full py-2  transition-colors",
        "hover:text-white",
        isOpen ? "" : "border",
        "text-slate-700 font-medium",
        buttonClassName,
    ].filter(Boolean).join(" ")


    return (
        // containerRef روی کانتینر اصلی است
        <div ref={containerRef} className={containerClassName}>
            {/* 1. محتوای منو (پنل کشویی) */}
            <div className={panelClassNames}>
                <div className={contentClasses}>
                    <div>{children}</div>
                </div>
            </div>

            {/* 2. دکمه باز و بسته کردن (حالا همیشه در پایین محتوا قرار می‌گیرد) */}
            <div className="mx-1">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className={triggerClassName}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                >
                    {/* آیکون برای نشان دادن جهت (بالا برای بستن، پایین برای باز کردن) */}
                    <svg
                        className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {/* آیکون فلش رو به پایین */}
                        <path d="M7 10l5 5 5-5z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}