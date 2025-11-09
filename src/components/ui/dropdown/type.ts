import { ReactNode } from "react"

export interface DropdownProps {
    children: ReactNode
    className?: string
    buttonClassName?: string
    panelClassName?: string
    contentClassName?: string
    onClose?: () => void
}