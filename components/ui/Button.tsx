import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50',
          {
            'bg-gradient-to-r from-primary to-accent text-white hover:scale-105 shadow-lg shadow-primary/25': variant === 'primary',
            'bg-surface-card text-white hover:bg-surface-border': variant === 'secondary',
            'text-gray-300 hover:text-white hover:bg-surface-border/50': variant === 'ghost',
            'border border-surface-border text-white hover:border-primary hover:text-primary': variant === 'outline',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
