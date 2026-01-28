export default function ApplicationSummaryCardsSkeleton() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 animate-pulse'>
      {/* 6개의 카드를 생성 */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className='bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800'
        >
          {/* 상단 라벨 스켈레톤 */}
          <div className='h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded mb-4' />

          <div className='flex items-baseline justify-between mt-3'>
            {/* 메인 수치 스켈레톤 (text-3xl 크기 대응) */}
            <div className='h-9 w-12 bg-slate-200 dark:bg-slate-800 rounded-lg' />

            {/* 우측 하단 배지 스켈레톤 */}
            <div className='h-5 w-10 bg-slate-100 dark:bg-slate-800 rounded-md' />
          </div>
        </div>
      ))}
    </div>
  );
}
