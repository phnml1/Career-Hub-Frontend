import { cn } from '@/shared/lib/utils';
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';

interface SidebarToggleButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

export default function SidebarToggleButton({
  isExpanded,
  onClick,
}: SidebarToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'absolute -right-3 top-9 z-100',
        'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1 shadow-sm',
        'text-slate-500 dark:text-slate-400 transition-colors',
        'hover:text-brand-500 dark:hover:text-brand-400 hover:border-brand-200 dark:hover:border-brand-900',
      )}
      aria-label={isExpanded ? '사이드바 접기' : '사이드바 펼치기'}
    >
      {isExpanded ? (
        <LucideChevronLeft className='w-3 h-3' />
      ) : (
        <LucideChevronRight className='w-3 h-3' />
      )}
    </button>
  );
}
