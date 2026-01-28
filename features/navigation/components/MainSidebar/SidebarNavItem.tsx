'use client';

import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarNavItemProps {
  href: string;
  name: string;
  icon: LucideIcon;
  count?: number;
  isActive: boolean;
  isExpanded: boolean;
}

export function SidebarNavItem({
  href,
  name,
  icon: Icon,
  count,
  isActive,
  isExpanded,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center rounded-lg transition-all group relative p-3',
        isExpanded ? 'justify-start' : 'justify-center',
        isActive
          ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
      )}
    >
      <Icon
        className={cn(
          'shrink-0 size-5',
          isActive
            ? 'text-brand-600'
            : 'text-slate-400 group-hover:text-slate-600'
        )}
      />

      {isExpanded && (
        <div className='flex-1 flex justify-between items-center ml-3'>
          <span className='whitespace-nowrap overflow-hidden text-sm font-medium'>
            {name}
          </span>
          {count ? (
            <span className='bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center'>
              {count}
            </span>
          ) : null}
        </div>
      )}

      {!isExpanded && count && (
        <span className='absolute top-2 right-2 flex h-2 w-2'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75' />
          <span className='relative inline-flex rounded-full h-2 w-2 bg-brand-500' />
        </span>
      )}
    </Link>
  );
}
