'use client';

import { forwardRef } from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

import { cn } from '@/shared/lib/utils/cn';

type RoundedSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

const roundedClassName: Record<RoundedSize, string> = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-2xl',
  full: 'rounded-full',
};

export type ButtonProps = AntButtonProps & {
  rounded?: RoundedSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, rounded = 'lg', type = 'default', size = 'middle', ...props }, ref) => {
    return (
      <AntButton
        {...props}
        ref={ref}
        type={type}
        size={size}
        className={cn(
          'flex items-center justify-center font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
          roundedClassName[rounded],
          className,
        )}
      />
    );
  },
);

Button.displayName = 'Button';
