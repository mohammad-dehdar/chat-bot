"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

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
        <motion.div
            ref={containerRef}
            className={`relative w-full overflow-hidden rounded-sm bg-background drop-shadow-md ${className || ""}`}
            initial={false}
            animate={{
                boxShadow: isOpen ? "0px 24px 48px rgba(34, 197, 94, 0.2)" : "0px 8px 32px rgba(15, 23, 42, 0.08)",
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
        >
            <div className="relative m-1 rounded-t-sm border border-divider border-b-0 bg-sidebar shadow-md">
                <AnimatePresence initial={false} mode="wait">
                    {isOpen && (
                        <motion.div
                            key="dropdown-panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className={`origin-top overflow-hidden ${panelClassName || ""}`}
                        >
                            <motion.div
                                initial={{ y: -12, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -8, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className={`w-full p-1 pb-0 ${contentClassName || ""}`}
                            >
                                <div>{children}</div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mx-1">
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className={`flex w-full items-center justify-center pb-2 font-medium text-foreground transition-colors ${
                            isOpen ? "" : "pt-2"
                        } ${buttonClassName || ""}`}
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                    >
                        <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <ChevronDownIcon className="h-5 w-5 text-accent" />
                        </motion.span>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}