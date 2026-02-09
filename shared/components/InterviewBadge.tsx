import { TagIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface InterviewBadgeProps {
  label: string;
  className?: string;
}

export default function InterviewBadge({
  label,
  className,
}: InterviewBadgeProps) {
  return (
    <span
      className={cn(
        // 배경 및 레이아웃
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-xl transition-colors',
        'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
        // 텍스트 스타일
        'text-slate-500 dark:text-slate-400 text-[11px] font-black whitespace-nowrap',
        className,
      )}
    >
      <TagIcon className='w-3.5 h-3.5' aria-hidden='true' />
      {label}
    </span>
  );
}
