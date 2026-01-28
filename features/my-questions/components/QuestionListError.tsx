'use client';

import { Button } from '@/shared/components/ui/button';
import { ButtonGroup } from '@/shared/components/ui/button-group';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuestionListErrorProps {
  reset: () => void;
}

export default function QuestionListError({ reset }: QuestionListErrorProps) {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center py-24 px-6 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 transition-all'>
      {/* 에러 아이콘 영역 */}
      <div className='flex items-center justify-center size-14 rounded-full bg-red-50 dark:bg-red-900/20 mb-5'>
        <AlertCircle className='size-7 text-red-500 dark:text-red-400' />
      </div>

      {/* 텍스트 영역 */}
      <h3 className='text-xl font-bold text-slate-900 dark:text-slate-100 mb-2'>
        나의 면접 질문 목록을 불러오지 못했어요
      </h3>

      <p className='text-sm text-slate-500 dark:text-slate-400 text-center max-w-[300px] mb-8 leading-relaxed'>
        서버와 연결이 잠시 원활하지 않습니다. <br />
        네트워크 상태를 확인하고 다시 시도해 주세요.
      </p>

      {/* 버튼 그룹 */}
      <div className='flex flex-col sm:flex-row gap-3 w-full max-w-[320px]'>
        <Button
          onClick={() => reset()}
          className='flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-brand-500/20'
        >
          <RotateCcw className='size-4' />
          다시 시도하기
        </Button>

        <Button
          onClick={() => router.push('/')}
          className='flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95'
        >
          <Home className='size-4' />
          홈으로 이동
        </Button>
      </div>
    </div>
  );
}
