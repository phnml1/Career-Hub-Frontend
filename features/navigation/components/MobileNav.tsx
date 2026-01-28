'use client';

import {
  BookMarkedIcon,
  BriefcaseIcon,
  CalendarIcon,
  LayoutDashboardIcon,
  UsersIcon,
  LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/dashboard', label: '대시보드', icon: LayoutDashboardIcon },
  { href: '/applications', label: '지원 현황', icon: BriefcaseIcon },
  { href: '/calendar', label: '캘린더', icon: CalendarIcon },
  { href: '/questions', label: '면접 질문', icon: BookMarkedIcon },
  { href: '/community', label: '커뮤니티', icon: UsersIcon },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className='h-[60px] md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-30 pb-safe transition-colors'>
      <div className='flex justify-between items-center px-2'>
        <Link
          href='/dashboard'
          className='flex flex-col items-center justify-center p-2 flex-1 space-y-1 text-slate-400 dark:text-slate-500'
        >
          <LayoutDashboardIcon className='w-6 h-6' />
          <span className='text-[10px] font-medium'>대시보드</span>
        </Link>
        <Link
          href='/applications'
          className='flex flex-col items-center justify-center p-2 flex-1 space-y-1 text-slate-400 dark:text-slate-500'
        >
          <BriefcaseIcon className='w-6 h-6' />
          <span className='text-[10px] font-medium'>지원 현황</span>
        </Link>
        <Link
          href='/calendar'
          className='flex flex-col items-center justify-center p-2 flex-1 space-y-1 text-slate-400 dark:text-slate-500'
        >
          <CalendarIcon className='w-6 h-6' />
          <span className='text-[10px] font-medium'>캘린더</span>
        </Link>
        <Link
          href='/questions'
          className='flex flex-col items-center justify-center p-2 flex-1 space-y-1 text-slate-400 dark:text-slate-500'
        >
          <BookMarkedIcon className='w-6 h-6' />
          <span className='text-[10px] font-medium'>면접 질문</span>
        </Link>
        <Link
          href='/community'
          className='flex flex-col items-center justify-center p-2 flex-1 space-y-1 text-brand-600 dark:text-brand-400'
        >
          <UsersIcon className='w-6 h-6 fill-brand-50 dark:fill-brand-900' />
          <span className='text-[10px] font-medium'>커뮤니티</span>
        </Link>
      </div>
    </div>
  );
}
