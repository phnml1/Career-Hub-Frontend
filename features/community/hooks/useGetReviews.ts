import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getReviews } from '../api/getReviews';
import { ReviewListResponse, SortOrder } from '../types';

interface UseGetReviewsParams {
  query?: string;
  sort: SortOrder;
}

/**
 * 면접 후기 목록을 무한 스크롤로 가져오는 커스텀 훅
 */
export const useGetReviews = ({ query, sort }: UseGetReviewsParams) => {
  return useSuspenseInfiniteQuery({
    /**
     * queryKey: 검색어와 정렬 조건이 바뀔 때마다
     * 새로운 캐시 컨텍스트를 생성합니다.
     */
    queryKey: ['reviews', { query, sort }],

    /**
     * queryFn: pageParam(lastReviewId)을 받아 API를 호출합니다.
     */
    queryFn: ({ pageParam }) =>
      getReviews({
        query,
        sort,
        lastReviewId: pageParam,
      }),

    initialPageParam: null as number | null,

    /**
     * 다음 페이지 번호(Cursor ID)를 결정하는 로직
     */
    getNextPageParam: (lastPage: ReviewListResponse) => {
      return lastPage.hasNext ? lastPage.nextCursorId : undefined;
    },

    /**
     * select: 백엔드 DTO 구조를 프론트엔드 Post 모델로 변환
     * 컴포넌트 코드를 수정하지 않도록 여기서 모든 필드명을 매핑합니다.
     */
    select: (data) => ({
      pages: data.pages.map((page) => ({
        ...page,
        posts: page.contents.map((review) => ({
          id: review.reviewId,
          companyName: review.company,
          position: review.position,
          interviewType: review.interviewType,
          content: review.shortContent ?? '',
          authorName: review.author,
          createdAt: review.createdAt.split('T')[0].replace(/-/g, '.'),
          isMine: !!review.isAuthor,
        })),
      })),
      pageParams: data.pageParams,
    }),
  });
};
