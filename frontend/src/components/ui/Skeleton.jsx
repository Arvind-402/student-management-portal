import React from 'react';
import { cn } from '@/lib/utils';

const Skeleton = ({ className }) => (
  <div className={cn('skeleton', className)} />
);

export const TableRowSkeleton = () => (
  <tr className="border-b border-slate-100">
    {[40, 24, 48, 32, 16, 24].map((w, i) => (
      <td key={i} className="px-5 py-4">
        <Skeleton className={`h-4 w-${w} max-w-full`} />
      </td>
    ))}
  </tr>
);

export const StatCardSkeleton = () => (
  <div className="stat-card">
    <Skeleton className="h-3 w-20 mb-3" />
    <Skeleton className="h-8 w-12 mb-1" />
    <Skeleton className="h-3 w-24" />
  </div>
);

export { Skeleton };
