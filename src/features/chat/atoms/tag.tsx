'use client';

import type { FC, ReactNode } from 'react';

interface TagProps {
  icon?: ReactNode;
  children: ReactNode;
  active?: boolean;
}

export const Tag: FC<TagProps> = ({ icon, children, active }) => {
  return (
    <span
      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? 'border-cyan-400/80 bg-cyan-500/20 text-cyan-100'
          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
      }`}
    >
      {icon}
      {children}
    </span>
  );
};
