'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { MOBILE_NAV_ITEMS } from '../constants';

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className='h-15 md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-30'>
      <div className='flex justify-between items-center px-2'>
        {MOBILE_NAV_ITEMS.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={`${item.label}-${index}`}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center p-2 flex-1 space-y-1 transition-colors',
                // 기본 스타일
                'text-slate-400 dark:text-slate-500',
                // 활성 스타일
                isActive && 'text-brand-600 dark:text-brand-400 font-black',
              )}
            >
              {
                <item.icon
                  className={cn(
                    'w-5 h-5',
                    isActive && 'text-brand-600 dark:text-brand-400',
                  )}
                />
              }
              <span className='text-xs font-semibold'>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
