import {
  PostReviewRequest,
  UpdateReviewRequest,
} from '@/features/community/api';
import { ENV } from '@/shared/constants/env';
import { http, HttpResponse } from 'msw';

// 초기 Mock 데이터 생성 및 상태 관리
let ALL_REVIEWS = Array.from({ length: 55 }, (_, i) => ({
  reviewId: i + 1,
  company: i % 3 === 0 ? '네이버' : i % 3 === 1 ? 'TechCorp' : 'Google Korea',
  position: 'Software Engineer',
  interviewType: i % 2 === 0 ? '1차 기술 면접' : '2차 임원 면접',
  shortContent: `${
    i + 1
  }번째 면접 후기 요약입니다. 면접 과정이 체계적이었어요.`,
  content: '상세 면접 후기 본문입니다. MSW에서 생성된 테스트 데이터입니다.',
  createdAt: '2024.06.15',
  author: `user_${i + 1}`,
  isAuthor: Math.random() < 0.5,
})).sort((a, b) => b.reviewId - a.reviewId); // 기본 내림차순(최신순)

export const communityHandlers = [
  // 면접 후기 목록 조회 (커서 기반 페이징)
  http.get(`${ENV.BFF_API_URL}/v1/reviews`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const sort = url.searchParams.get('sort') || 'NEWEST';
    const lastReviewId = url.searchParams.get('lastReviewId');
    const size = parseInt(url.searchParams.get('size') || '20');

    // 🚀 [에러 테스트용 로직 추가]
    // 검색창에 'error'라고 입력하면 즉시 500 에러를 던집니다.
    if (query === 'error') {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Internal Server Error (MSW Test)',
      });
    }

    // [필터링] 회사명, 포지션, 면접유형 검색
    let processed = [...ALL_REVIEWS];
    if (query) {
      processed = processed.filter(
        (r) =>
          r.company.includes(query) ||
          r.position.includes(query) ||
          r.interviewType.includes(query),
      );
    }

    // [정렬]
    if (sort === 'OLDEST') {
      processed.sort((a, b) => a.reviewId - b.reviewId);
    } else {
      processed.sort((a, b) => b.reviewId - a.reviewId);
    }

    // [페이징] lastReviewId 이후의 데이터 size만큼 추출
    const startIndex = lastReviewId
      ? processed.findIndex((r) => r.reviewId === Number(lastReviewId)) + 1
      : 0;

    const contents = processed.slice(startIndex, startIndex + size);
    const hasNext = startIndex + size < processed.length;
    const nextCursorId = hasNext
      ? contents[contents.length - 1].reviewId
      : null;

    return HttpResponse.json({ contents, hasNext, nextCursorId });
  }),

  // 면접 후기 상세 조회
  http.get(`${ENV.BFF_API_URL}/v1/reviews/:reviewId`, ({ params }) => {
    const { reviewId } = params;
    const review = ALL_REVIEWS.find((r) => r.reviewId === Number(reviewId));

    if (!review) return new HttpResponse(null, { status: 404 });

    return HttpResponse.json({
      ...review,
      interviewQuestions: [
        {
          questionId: 1,
          question: 'React의 Virtual DOM 작동 원리에 대해 설명해주세요.',
        },
        {
          questionId: 2,
          question: '브라우저 렌더링 과정을 상세히 설명해주세요.',
        },
      ],
    });
  }),

  // 면접 후기 등록 (POST)
  http.post(`${ENV.BFF_API_URL}/v1/reviews`, async ({ request }) => {
    const body = (await request.json()) as PostReviewRequest;

    const newReview = {
      reviewId: Math.max(...ALL_REVIEWS.map((r) => r.reviewId), 0) + 1,
      company: body.company,
      position: body.position,
      interviewType: body.interviewType,
      shortContent: body.content.slice(0, 50),
      content: body.content,
      createdAt: new Date().toLocaleDateString('ko-KR').slice(0, -1),
      author: '나(로그인 유저)',
      isAuthor: true,
    };

    ALL_REVIEWS = [newReview, ...ALL_REVIEWS];
    return HttpResponse.json(newReview, { status: 201 });
  }),

  // 면접 후기 수정 (PATCH)
  http.patch(
    `${ENV.BFF_API_URL}/v1/reviews/:reviewId`,
    async ({ params, request }) => {
      const { reviewId } = params;
      const body = (await request.json()) as UpdateReviewRequest;

      let isFound = false;
      ALL_REVIEWS = ALL_REVIEWS.map((review) => {
        if (review.reviewId === Number(reviewId)) {
          isFound = true;
          return {
            ...review,
            company: body.company,
            position: body.position,
            interviewType: body.interviewType,
            content: body.content,
            shortContent: body.content.slice(0, 50),
          };
        }
        return review;
      });

      if (!isFound) return new HttpResponse(null, { status: 404 });
      return HttpResponse.json(null, { status: 204 });
    },
  ),

  // 면접 후기 삭제 (DELETE)
  http.delete(`${ENV.BFF_API_URL}/v1/reviews/:reviewId`, ({ params }) => {
    const { reviewId } = params;
    const targetId = Number(reviewId);

    const existIndex = ALL_REVIEWS.findIndex(
      (r) => Number(r.reviewId) === targetId,
    );

    if (existIndex === -1) {
      return HttpResponse.json(
        { message: '리뷰를 찾을 수 없습니다.', statusCode: 404 },
        { status: 404 },
      );
    }

    // 해당 ID를 제외한 새로운 배열로 교체
    ALL_REVIEWS = ALL_REVIEWS.filter((r) => Number(r.reviewId) !== targetId);

    return new HttpResponse(null, { status: 204 });
  }),
];
