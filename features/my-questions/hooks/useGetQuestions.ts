import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { GetQuestionListResponse, getQuestions } from '../api/getQuestions';

interface UseGetQuestionsProps {
  linkStatus: 'LINKED' | 'UNLINKED';
  query?: string;
  size?: number;
}

export const useGetQuestions = ({
  linkStatus,
  query,
  size = 20,
}: UseGetQuestionsProps) => {
  return useSuspenseInfiniteQuery<GetQuestionListResponse>({
    queryKey: ['questions', linkStatus, query],

    queryFn: ({ pageParam }) =>
      getQuestions({
        linkStatus,
        query,
        size,
        lastCursorId: pageParam as number | undefined,
      }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursorId : undefined;
    },

    // 탭 전환 시 로딩 표시를 위해 지연 방지
    staleTime: 1000 * 60, // 1분 동안은 캐시 유지
  });
};
