export default function BeforeDeadlineApplicationsSkeleton() {
  return (
    <div className='space-y-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border animate-pulse'>
      {/* 1. 헤더 영역 (아이콘, 타이틀, 더보기 버튼) */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <div className='w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-full' />
          <div className='h-7 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg' />
        </div>
        <div className='h-5 w-12 bg-slate-100 dark:bg-slate-800 rounded-md' />
      </div>

      {/* 2. 카드 리스트 영역 (Grid 2열 구조) */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='p-5 rounded-2xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between'
          >
            <div className='space-y-3 flex-1'>
              {/* 회사명 로고 + 텍스트 느낌 */}
              <div className='flex items-center gap-x-3'>
                <div className='w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl' />
                <div className='space-y-2'>
                  <div className='h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded' />
                  <div className='h-3 w-32 bg-slate-100 dark:bg-slate-800 rounded' />
                </div>
              </div>
            </div>
            {/* 우측 화살표 아이콘 자리 */}
            <div className='w-4 h-4 bg-slate-200 dark:bg-slate-800 rounded-full ml-4' />
          </div>
        ))}
      </div>
    </div>
  );
}
