import { forwardRef } from 'react';
import type { InputProps } from './type';

const baseClassName =
    'text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-50';

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => {
    const composedClassName = [baseClassName, className].filter(Boolean).join(' ');

    return <input ref={ref} type={type} className={composedClassName} {...props} />;
});

Input.displayName = 'Input';
