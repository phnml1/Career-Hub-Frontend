'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { NAV_ITEMS } from '../constants';

export default function MyQuestionsNav() {
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type') || 'linked';

  return (
    <nav className='w-full mb-8' aria-label='질문 유형 선택'>
      <div className='flex flex-col sm:flex-row p-1.5 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 gap-1.5'>
        {NAV_ITEMS.map((item) => {
          const isActive = currentType === item.id;
          const Icon = item.icon;

          return (
            <Tooltip key={item.id} delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  href={`?type=${item.id}`}
                  replace // 뒤로가기 스택이 쌓이는 걸 방지 (탭 전환시 권장)
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-600'
                      : 'text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-300',
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4',
                      isActive ? 'animate-in zoom-in-90' : '',
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side='bottom'
                className='px-3 py-1.5 text-xs font-medium bg-slate-900 dark:bg-slate-100 text-slate-50 dark:text-slate-900 rounded-lg shadow-xl'
              >
                {item.description}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </nav>
  );
}
