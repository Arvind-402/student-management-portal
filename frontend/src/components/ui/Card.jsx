import React from 'react';
import { cn } from '@/lib/utils';

const Card = ({ className, children, ...props }) => (
  <div className={cn('bg-white rounded-2xl border border-slate-100 shadow-card', className)} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className, children }) => (
  <div className={cn('px-6 py-5 border-b border-slate-100', className)}>{children}</div>
);

const CardBody = ({ className, children }) => (
  <div className={cn('px-6 py-5', className)}>{children}</div>
);

const CardFooter = ({ className, children }) => (
  <div className={cn('px-6 py-4 border-t border-slate-100 bg-slate-50/60 rounded-b-2xl', className)}>{children}</div>
);

export { Card, CardHeader, CardBody, CardFooter };
