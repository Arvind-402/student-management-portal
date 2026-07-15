import React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({
  className,
  label,
  icon: Icon,
  error,
  id,
  placeholder = ' ', 
  ...props
}, ref) => {
  const inputId = id || React.useId();
  return (
    <div className="relative w-full flex flex-col pt-1">
      <div className="relative w-full">
        {Icon && (
          <span className="absolute left-3.5 top-[58%] -translate-y-1/2 text-slate-400 pointer-events-none transition-colors peer-focus:text-brand-500 z-10">
            <Icon size={16} />
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          placeholder={placeholder}
          className={cn(
            'peer w-full bg-white border rounded-xl text-sm text-slate-900 placeholder-transparent transition-all duration-200 outline-none',
            'focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:placeholder-slate-400/50',
            Icon ? 'pl-10 pr-4 pt-6 pb-2' : 'px-4 pr-4 pt-6 pb-2',
            error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-brand-500',
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'absolute transition-all duration-200 pointer-events-none select-none z-10 origin-left',
              
              Icon ? 'left-10 top-[17px] text-slate-400 text-sm' : 'left-4 top-[17px] text-slate-400 text-sm',
              
              'peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-600',
              'peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-slate-400'
            )}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-[11px] text-red-500 font-semibold flex items-center gap-1.5 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
});
Input.displayName = 'Input';

const FormField = ({ label, error, children, required }) => (
  <div className="flex flex-col">
    {children}
  </div>
);

export { Input, FormField };
