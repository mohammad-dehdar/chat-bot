"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "@icon";
import { DropdownProps } from "./type";

export const Dropdown = ({
    children,
    className,
    buttonClassName,
    panelClassName,
    contentClassName,
    onClose,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        closeDropdown();
      }
    },
    [closeDropdown]
  );

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    },
    [closeDropdown]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape, isOpen]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (prev && !next) {
        onClose?.();
      }
      return next;
    });
  }, [onClose]);

  const containerClassName = useMemo(
    () =>
      [
        "relative w-full overflow-hidden rounded-sm bg-white drop-shadow-md transition-all duration-500 ease-in-out",
        isOpen ? "drop-shadow-[#00FFEA]/90" : "drop-shadow-white/50",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [className, isOpen]
  );

  const panelClassNames = useMemo(
    () =>
      [
        "overflow-hidden origin-top transition-all duration-300 ease-in-out",
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        panelClassName,
      ]
        .filter(Boolean)
        .join(" "),
    [isOpen, panelClassName]
  );

  const buttonClassNames = useMemo(
    () =>
      [
        "flex items-center justify-center bg-gradien w-full pb-2 font-medium text-slate-700 transition-colors",
        !isOpen && "pt-2",
        buttonClassName,
      ]
        .filter(Boolean)
        .join(" "),
    [buttonClassName, isOpen]
  );

  const chevronClassNames = useMemo(
    () =>
      [
        "h-5 w-5 text-[#250066] transition-transform duration-300",
        isOpen && "rotate-180",
      ]
        .filter(Boolean)
        .join(" "),
    [isOpen]
  );

  return (
    <div ref={containerRef} className={containerClassName}>
      <div className="relative m-1 rounded-t-sm border border-slate-300 border-b-0 bg-gradient-to-b from-[#E0F2F1] to-[#D9E9F0] shadow-md">
        <div className={panelClassNames}>
          <div className={["w-full p-1 pb-0", contentClassName].filter(Boolean).join(" ")}>
            <div>{children}</div>
          </div>
        </div>

        <div className="mx-1">
          <button
            type="button"
            onClick={toggleDropdown}
            className={buttonClassNames}
            aria-haspopup="menu"
            aria-expanded={isOpen}
          >
            <ChevronDownIcon className={chevronClassNames} />
          </button>
        </div>
      </div>
    </div>
  );
};