'use client';

import type { FC } from 'react';
import Image from 'next/image';

interface PanelItemProps {
  label: string;
  icon?: string;
  active?: boolean;
  secondary?: string;
}

export const PanelItem: FC<PanelItemProps> = ({ label, icon, active, secondary }) => {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-right text-sm transition-colors ${
        active
          ? 'border-cyan-400/80 bg-cyan-500/20 text-white'
          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20'
      }`}
    >
      {icon && (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <Image src={icon} alt={label} width={20} height={20} />
        </span>
      )}
      <span className="flex-1 text-right">
        <span className="block text-sm font-semibold">{label}</span>
        {secondary && <span className="mt-1 block text-xs text-white/60">{secondary}</span>}
      </span>
    </button>
  );
};
