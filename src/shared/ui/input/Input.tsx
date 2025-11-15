'use client';

import { forwardRef } from 'react';
import { Input as AntInput } from 'antd';
import type { InputRef, InputProps as AntInputProps } from 'antd';

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

export type InputProps = AntInputProps & {
  rounded?: RoundedSize;
};

export const Input = forwardRef<InputRef, InputProps>(
  ({ className, rounded = 'lg', size = 'middle', ...props }, ref) => {
    return (
      <AntInput
        {...props}
        ref={ref}
        size={size}
        className={cn(
          'text-sm text-right placeholder:text-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
          roundedClassName[rounded],
          className,
        )}
      />
    );
  },
);

Input.displayName = 'Input';
