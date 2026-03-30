import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  leftIcon?: React.ReactNode;
  variant?: 'default' | 'error' | 'success';
  errorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, leftIcon, variant = 'default', errorMessage, ...props }, ref) => {
    return (
      <div className="relative w-full mb-4">
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-gray-400 z-10 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'peer w-full rounded-lg bg-surface-card border transition-colors pt-5 pb-2 text-sm text-white focus:outline-none focus:ring-1',
              {
                'border-surface-border focus:border-primary focus:ring-primary': variant === 'default',
                'border-red-500 focus:border-red-500 focus:ring-red-500': variant === 'error',
                'border-green-500 focus:border-green-500 focus:ring-green-500': variant === 'success',
                'pl-10': !!leftIcon,
                'pl-4': !leftIcon,
                'pr-10': variant === 'error' || variant === 'success',
              },
              className
            )}
            placeholder=" "
            ref={ref}
            {...props}
          />
          <label
            className={cn(
              'absolute text-sm text-gray-400 transition-all duration-200 pointer-events-none',
              'peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base',
              'peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary',
              'top-1.5 text-xs',
              {
                'left-10': !!leftIcon,
                'left-4': !leftIcon,
              }
            )}
          >
            {label}
          </label>
          
          {variant === 'error' && (
            <AlertCircle className="absolute right-3 w-5 h-5 text-red-500 pointer-events-none" />
          )}
          {variant === 'success' && (
            <CheckCircle2 className="absolute right-3 w-5 h-5 text-green-500 pointer-events-none" />
          )}
        </div>
        {variant === 'error' && errorMessage && (
          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
