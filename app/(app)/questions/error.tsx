'use client';

import { useEffect } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import QuestionListError from '@/features/my-questions/components/QuestionListError';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MyQuestionsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 발생 시 로그 서비스(예: Sentry)에 기록하거나 콘솔에 출력합니다.
    console.error('Questions Page Error:', error);
  }, [error]);

  return (
    <QueryErrorResetBoundary>
      {({ reset: queryReset }) => (
        <QuestionListError
          reset={() => {
            queryReset(); // 1. React Query 에러 캐시 초기화
            reset(); // 2. Next.js 라우트 세그먼트 리렌더링
          }}
        />
      )}
    </QueryErrorResetBoundary>
  );
}
