import React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  primary:   'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:bg-slate-100',
  danger:    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm',
  ghost:     'text-slate-600 hover:bg-slate-100 active:bg-slate-200',
  outline:   'border border-brand-500 text-brand-600 hover:bg-brand-50',
};

const sizes = {
  sm:   'h-8 px-3 text-xs rounded-lg gap-1.5',
  md:   'h-9 px-4 text-sm rounded-xl gap-2',
  lg:   'h-11 px-6 text-sm rounded-xl gap-2',
  icon: 'h-9 w-9 rounded-xl',
};

const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...props
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || isLoading}
    className={cn(
      'inline-flex items-center justify-center font-medium transition-all duration-200',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  >
    {isLoading ? (
      <>
        <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        <span>Saving…</span>
      </>
    ) : children}
  </button>
));
Button.displayName = 'Button';

export { Button };
