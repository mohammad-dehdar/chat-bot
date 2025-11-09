import { forwardRef } from 'react';
import type { ButtonProps } from './type';

const baseClassName =
    'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-50';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, type = 'button', ...props }, ref) => {
    const composedClassName = [baseClassName, className].filter(Boolean).join(' ');

    return <button ref={ref} type={type} className={composedClassName} {...props} />;
});

Button.displayName = 'Button';
