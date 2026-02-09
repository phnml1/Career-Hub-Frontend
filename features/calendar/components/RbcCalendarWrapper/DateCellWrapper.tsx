import { cn } from '@/shared/lib/utils';
import { ExpandIcon } from 'lucide-react';
import { DateCellWrapperProps } from 'react-big-calendar';

export default function DateCellWrapper({
  children,
  value,
  range,
}: DateCellWrapperProps) {
  const isFirstColumn =
    range && range[0].toDateString() === value.toDateString();

  return (
    <div
      className={cn(
        'relative h-full w-full transition-colors group bg-white dark:bg-slate-900',
        'hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer',
        // 첫 번째 열이 아닐 때만 왼쪽 보더 추가
        !isFirstColumn && 'border-l border-border',
      )}
    >
      {/* 캘린더가 기본적으로 제공하는 내부 요소(이벤트 등)를 렌더링하기 위해 children이 반드시 필요합니다. */}
      {children}

      {/* 칸 하단에 마우스 호버 시 나타나는 커스텀 UI 예시 */}
      <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
        <span className='text-[10px] text-slate-400'>
          <ExpandIcon className='w-3 h-3' />
        </span>
      </div>
    </div>
  );
}
