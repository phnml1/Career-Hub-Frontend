export default function PostListSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6'>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className='bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all relative animate-pulse'
        >
          {/* 우측 상단 드롭다운 메뉴 아이콘 자리 */}
          <div className='absolute top-6 right-6 w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full' />

          {/* 컨텐츠 영역 */}
          <div className='flex justify-between items-start mb-3'>
            <div className='flex-1 min-w-0 pr-8'>
              {/* 제목/헤더 라인 (기업명 | 포지션 | 면접유형) */}
              <div className='flex items-center gap-2 mb-3'>
                <div className='size-4 bg-slate-200 dark:bg-slate-700 rounded' />{' '}
                {/* 아이콘 */}
                <div className='h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded' />{' '}
                {/* 기업명 */}
                <div className='h-4 w-2 bg-slate-100 dark:bg-slate-800 rounded' />{' '}
                {/* | */}
                <div className='size-4 bg-slate-200 dark:bg-slate-700 rounded' />{' '}
                {/* 아이콘 */}
                <div className='h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded' />{' '}
                {/* 포지션 */}
                <div className='h-4 w-2 bg-slate-100 dark:bg-slate-800 rounded' />{' '}
                {/* | */}
                <div className='h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded' />{' '}
                {/* 면접유형 배지 */}
              </div>

              {/* 본문 텍스트 (line-clamp-3 높이 재현) */}
              <div className='min-h-22 space-y-2 mt-4'>
                <div className='h-4 w-full bg-slate-100 dark:bg-slate-800 rounded' />
                <div className='h-4 w-[90%] bg-slate-100 dark:bg-slate-800 rounded' />
                <div className='h-4 w-[75%] bg-slate-100 dark:bg-slate-800 rounded' />
              </div>
            </div>
          </div>

          {/* 하단 정보 영역 */}
          <div className='flex items-center justify-between mt-4'>
            <div className='flex items-center space-x-4'>
              {/* 작성자 닉네임 배지 */}
              <div className='h-6 w-14 bg-slate-100 dark:bg-slate-800 rounded' />
            </div>
            {/* 상대 시간 */}
            <div className='h-3 w-12 bg-slate-100 dark:bg-slate-800 rounded' />
          </div>
        </div>
      ))}
    </div>
  );
}
