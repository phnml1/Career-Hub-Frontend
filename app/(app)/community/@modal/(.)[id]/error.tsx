'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircleIcon, RotateCcwIcon, XIcon } from 'lucide-react';

export default function PostDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // 에러 로그를 분석 서비스에 기록할 수 있습니다.
    console.error('Post Detail Error:', error);
  }, [error]);

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl mx-4 text-center relative'>
        {/* 닫기 버튼: 모달 뒤로가기 역할 */}
        <button
          onClick={() => router.back()}
          className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors'
        >
          <XIcon className='w-5 h-5' />
        </button>

        <div className='flex flex-col items-center gap-4'>
          <div className='w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center'>
            <AlertCircleIcon className='w-8 h-8 text-red-500' />
          </div>

          <div className='space-y-2'>
            <h2 className='text-xl font-bold text-slate-900 dark:text-slate-100'>
              후기를 불러올 수 없어요
            </h2>
            <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed'>
              네트워크 연결이 불안정하거나 삭제된 게시글일 수 있습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </p>
          </div>

          <div className='flex items-center gap-3 w-full mt-4'>
            <button
              onClick={() => router.back()}
              className='flex-1 h-12 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all'
            >
              뒤로가기
            </button>
            <button
              onClick={() => reset()}
              className='flex-1 h-12 rounded-xl font-bold text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2'
            >
              <RotateCcwIcon className='w-4 h-4' />
              다시 시도
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
