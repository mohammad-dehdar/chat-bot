'use client';

import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  active?: boolean;
  subtle?: boolean;
}

function mergeClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export const IconButton: FC<IconButtonProps> = ({
  icon,
  active,
  subtle,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={mergeClasses(
        'inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors',
        subtle
          ? 'bg-white/5 text-white/60 hover:bg-white/10'
          : 'bg-cyan-500/20 text-cyan-100 hover:bg-cyan-500/40',
        active && 'ring-2 ring-cyan-300/80',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};
