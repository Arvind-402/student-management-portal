import React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default:  'bg-slate-100 text-slate-700',
  blue:     'bg-blue-50 text-blue-700 border border-blue-200',
  green:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  violet:   'bg-violet-50 text-violet-700 border border-violet-200',
  amber:    'bg-amber-50 text-amber-700 border border-amber-200',
  red:      'bg-red-50 text-red-700 border border-red-200',
  pink:     'bg-pink-50 text-pink-700 border border-pink-200',
  cyan:     'bg-cyan-50 text-cyan-700 border border-cyan-200',
  indigo:   'bg-indigo-50 text-indigo-700 border border-indigo-200',
};

const courseColorMap = (course = '') => {
  const c = course.toLowerCase();
  if (c.includes('computer') || c.includes('cs') || c.includes('software')) return 'blue';
  if (c.includes('science') || c.includes('biology')) return 'green';
  if (c.includes('math') || c.includes('physics')) return 'violet';
  if (c.includes('engineer')) return 'amber';
  if (c.includes('art') || c.includes('design')) return 'pink';
  if (c.includes('ai') || c.includes('data') || c.includes('ml')) return 'cyan';
  if (c.includes('medical') || c.includes('health')) return 'red';
  return 'indigo';
};

const Badge = ({ children, variant, course, className }) => {
  const v = variant || (course ? courseColorMap(course) : 'default');
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variants[v],
      className
    )}>
      {children}
    </span>
  );
};

export { Badge, courseColorMap };
