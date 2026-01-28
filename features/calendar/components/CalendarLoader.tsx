'use client';

import { Loader2Icon } from 'lucide-react';
import RbcCalendarWrapper from './RbcCalendarWrapper';

/**
 * 캘린더 레이아웃은 유지하면서 그 위에 로딩 상태를 표시하는 컴포넌트
 * Suspense의 fallback으로 사용됩니다.
 */
export default function CalendarLoader() {
  return (
    <div className='relative h-full w-full'>
      {/* 1. 실제 캘린더의 틀을 빈 데이터와 함께 렌더링 (격자 유지) */}
      <RbcCalendarWrapper events={[]} />

      {/* 2. 그 위에 덮어씌울 로딩 스켈레톤/오버레이 레이어 */}
      <div className='absolute top-[68px] inset-0 z-100 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] dark:bg-black/20'>
        <div className='flex flex-col items-center gap-3'>
          <div className='relative'>
            {/* 스피너 애니메이션 */}
            <Loader2Icon className='h-12 w-12 animate-spin text-brand-500' />
            {/* 중앙에 고정된 점이나 로고가 있다면 추가 가능 */}
          </div>
          <p className='text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse'>
            일정을 가져오고 있습니다...
          </p>
        </div>
      </div>
    </div>
  );
}
