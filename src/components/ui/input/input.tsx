import { forwardRef } from 'react';
import type { InputProps } from './type';

const baseClassName =
    'text-sm transition-colors focus-visible:outline-none  focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-50';

const getRoundedClassName = (rounded?: string): string => {
    if (!rounded || rounded === 'none') return '';
    return `rounded-${rounded}`;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', rounded, ...props }, ref) => {
    const roundedClassName = getRoundedClassName(rounded);
    const composedClassName = [baseClassName, roundedClassName, className].filter(Boolean).join(' ');

    return <input ref={ref} type={type} className={composedClassName} {...props} />;
});

Input.displayName = 'Input';
