export default function StatusPieChartSkeleton() {
  return (
    <div className='bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 animate-pulse'>
      {/* 헤더 부분 */}
      <div className='flex gap-x-2 items-center mb-6'>
        <div className='w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-full' />
        <div className='h-7 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg' />
      </div>

      {/* 도넛 차트 형태 뼈대 */}
      <div className='h-48 flex items-center justify-center'>
        <div className='relative w-36 h-36 rounded-full border-[18px] border-slate-100 dark:border-slate-800 flex items-center justify-center'>
          {/* 중앙 구멍 부분 (Inner Radius 재현) */}
          <div className='w-full h-full rounded-full border-[2px] border-dashed border-slate-50 dark:border-slate-800/50' />
        </div>
      </div>

      {/* 하단 범례 뼈대 */}
      <div className='flex flex-wrap justify-center gap-4 mt-6'>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className='flex items-center space-x-1.5'>
            <div className='w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800' />
            <div className='h-3 w-12 bg-slate-100 dark:bg-slate-800 rounded' />
          </div>
        ))}
      </div>
    </div>
  );
}
