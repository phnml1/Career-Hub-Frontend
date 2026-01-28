export default function UpcomingSchedulesSkeleton() {
  return (
    <div className='bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border animate-pulse'>
      {/* 헤더 부분 뼈대 */}
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center gap-2'>
          {/* 아이콘 + 제목 느낌 */}
          <div className='w-5 h-5 bg-brand-100 dark:bg-brand-900/30 rounded-full' />
          <div className='h-7 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg' />
        </div>
        <div className='h-5 w-12 bg-slate-100 dark:bg-slate-800 rounded-md' />
      </div>

      {/* 리스트 부분 뼈대 (4개) */}
      <div className='space-y-2'>
        {' '}
        {/* 실제 아이템 gap-y-2와 동기화 */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='h-[80px] w-full bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl flex items-center px-4 space-x-4 border border-transparent'
          >
            {/* D-Day 배지 뼈대: w-14 h-12 규격 유지 */}
            <div className='shrink-0 w-14 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl' />

            {/* 텍스트 정보 뼈대: 실제 레이아웃과 동일하게 상하 배치 */}
            <div className='flex-1 min-w-0 space-y-2'>
              <div className='flex justify-between items-start'>
                <div className='h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded' />
                <div className='h-4 w-10 bg-slate-100 dark:bg-slate-800 rounded-full' />
              </div>
              <div className='h-3 w-40 bg-slate-100 dark:bg-slate-800 rounded' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
