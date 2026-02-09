import { LucideIcon, Building2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface CompanyBadgeProps {
  name: string;
  icon?: LucideIcon;
  className?: string;
}

export default function CompanyBadge({
  name,
  icon: Icon = Building2, // 기본 아이콘 설정
  className,
}: CompanyBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-black transition-colors border border-border',
        // Light Mode 스타일
        'bg-brand-50 text-brand-600',
        // Dark Mode 스타일
        'dark:bg-brand-900/40 dark:text-brand-400',
        className,
      )}
    >
      <Icon className='w-3.5 h-3.5' aria-hidden='true' />
      {name}
    </span>
  );
}
