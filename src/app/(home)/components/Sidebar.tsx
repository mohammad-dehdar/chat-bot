'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Input } from '@/components/ui';
import { AddIcon, DIcon, SearchIcon, SendMessageIcon } from '@icon';

const sidebarVariants = {
  open: { width: 240 },
  collapsed: { width: 64 },
};

const springConfig = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
};

export function Sidebar() {
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
    <motion.aside
      className="border-divider bg-sidebar relative flex h-screen flex-col border-l"
      initial={false}
      animate={isOpen ? 'open' : 'collapsed'}
      variants={sidebarVariants}
      transition={springConfig}
    >
      <div className={`flex items-center p-2 ${isOpen ? 'justify-end' : 'justify-center'}`}>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            onClick={toggleSidebar}
            className="rounded-lg p-2 transition-colors hover:bg-surface"
            aria-label={isOpen ? 'بستن سایدبار' : 'باز کردن سایدبار'}
            type="button"
            icon={<DIcon />}
          />
        </motion.div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-2">
        <div className="relative">
          <motion.div
            className={`flex items-center gap-2 rounded-2xl bg-surface shadow-sm ${isOpen ? 'px-3 py-2' : 'justify-center p-2'
              }`}
            animate={{
              boxShadow: isOpen
                ? '0px 18px 36px rgba(15, 23, 42, 0.12)'
                : '0px 10px 24px rgba(15, 23, 42, 0.08)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.span animate={{ rotate: isOpen ? 0 : -15 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
              <SearchIcon className="text-muted" />
            </motion.span>
            <AnimatePresence initial={false} mode="popLayout">
              {isOpen && (
                <motion.div
                  key="search-input"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex-1"
                >
                  <Input
                    type="text"
                    placeholder="جستجو"
                    className="bg-transparent text-right placeholder:text-muted"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

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

          <AnimatePresence initial={false}>
            {!isOpen && isSearchOpen && (
              <motion.div
                key="floating-search"
                initial={{ opacity: 0, x: -12, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-surface absolute left-full top-0 z-10 ml-3 w-56 rounded-2xl p-3 shadow-lg"
              >
                <Input
                  ref={floatingSearchRef}
                  type="text"
                  placeholder="جستجو"
                  className="rounded-xl border border-divider bg-white/40 px-3 py-2 text-right placeholder:text-muted"
                  onBlur={() => setIsSearchOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div whileTap={{ scale: 0.97 }}>
          <Button
            type="button"
            className={`bg-surface flex w-full items-center gap-2 rounded-sm text-xs font-semibold shadow-sm transition-all duration-200 ${isOpen ? 'justify-start px-3 py-2' : 'justify-center p-2'
              }`}
            title="گفتگوی جدید"
            icon={<AddIcon className="text-muted" />}
          >
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.span
                  key="new-chat-label"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  گفت و گو جدید
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </motion.aside>
  );
}
