"use client"

import { useEffect, useRef, useState } from "react"
import { DropdownProps } from "./type"
import { ChevronDownIcon } from "@icon"

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if (isOpen && containerRef.current && !containerRef.current.contains(target)) {
                setIsOpen(false)
                onClose?.()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen, onClose])

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

    return (
        <div
            ref={containerRef}
            className={`relative rounded-sm w-full overflow-hidden bg-white drop-shadow-md transition-all duration-500 ease-in-out ${isOpen ? "drop-shadow-[#00FFEA]/90" : "drop-shadow-white/50"} ${className || ""}`}
        >
            <div className="bg-gradient-to-b from-[#E0F2F1] border border-slate-300 shadow-md border-b-0 to-[#D9E9F0] m-1 rounded-t-sm relative">
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out origin-top ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} ${panelClassName || ""}`}
                >
                    <div className={`w-full p-1 pb-0 ${contentClassName || ""}`}>
                        <div>{children}</div>
                    </div>
                </div>

                <div className="mx-1">
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className={`flex bg-gradien items-center justify-center w-full pb-2 transition-colors  ${isOpen ? "" : "pt-2"} text-slate-700 font-medium ${buttonClassName || ""}`}
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                    >
                        <ChevronDownIcon className={`h-5 w-5 text-[#250066] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                </div>
            </div>
        </div>
    )
}