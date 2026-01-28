export default function ActivityChartSkeleton() {
  return (
    <div className='bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border animate-pulse'>
      {/* 1. 헤더 영역 (제목 & 탭 버튼) */}
      <div className='flex justify-between mb-8'>
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center gap-x-2'>
            <div className='w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-full' />
            <div className='h-7 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg' />
          </div>
          <div className='h-4 w-60 bg-slate-100 dark:bg-slate-800/60 rounded' />
        </div>

        {/* 주간/월간 탭 버튼 뼈대 */}
        <div className='w-24 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl' />
      </div>

      {/* 2. 차트 바디 영역 (막대 그래프 시뮬레이션) */}
      <div className='h-64 flex items-end justify-between px-2 pb-6 border-b border-slate-100 dark:border-slate-800'>
        {/* 실제 주간 7개 막대를 기준으로 구성 */}
        {[60, 40, 85, 50, 70, 35, 90].map((height, i) => (
          <div key={i} className='flex flex-col items-center gap-y-3 w-full'>
            {/* 막대 뼈대 */}
            <div
              className='w-8 bg-slate-100 dark:bg-slate-800/50 rounded-t-lg'
              style={{ height: `${height}%` }}
            />
            {/* X축 라벨 뼈대 */}
            <div className='h-3 w-8 bg-slate-100 dark:bg-slate-800 rounded' />
          </div>
        ))}
      </div>

      {/* 3. 하단 요약 카드 뼈대 */}
      <div className='mt-6 h-[54px] w-full bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center'>
        <div className='h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded' />
      </div>
    </div>
  );
}
