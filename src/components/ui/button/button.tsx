import { forwardRef } from 'react';
import type { ButtonProps } from './type';

const baseClassName =
    'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-50';

const getRoundedClassName = (rounded?: string): string => {
    if (!rounded || rounded === 'none') return '';
    return `rounded-${rounded}`;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, type = 'button', icon, children, rounded, ...props }, ref) => {
    const roundedClassName = getRoundedClassName(rounded);
    const composedClassName = [baseClassName, roundedClassName, className].filter(Boolean).join(' ');

    return (
        <button ref={ref} type={type} className={composedClassName} {...props}>
            {icon}
            {children}
        </button>
    );
});

Button.displayName = 'Button';
