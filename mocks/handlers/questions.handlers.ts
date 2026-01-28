import { http, HttpResponse } from 'msw';
import { ENV } from '@/shared/constants/env';
import { fakerKO as faker } from '@faker-js/faker';
import { INTERVIEW_DROPDOWN_OPTIONS } from '@/shared/constants/interview';

export const questionsHandlers = [
  http.get(`${ENV.BFF_API_URL}/v1/archive/questions`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const linkStatus = url.searchParams.get('linkStatus') || 'LINKED'; // LINKED | UNLINKED
    const cursor = url.searchParams.get('lastCursorId');
    const limit = Number(url.searchParams.get('size')) || 20;

    // 에러 테스트 로직: 검색어에 'error' 입력 시 500 에러 반환
    if (query === 'error') {
      return new HttpResponse(
        JSON.stringify({
          statusCode: 500,
          message: '서버 내부 에러 (MSW Test)',
          validation: {},
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // 전체 데이터 시뮬레이션 (검색을 위해 고정된 시드 값 사용 추천)
    const generateTotalData = (totalCount: number) => {
      return Array.from({ length: totalCount }, (_, index) => {
        const id = index + 1;
        const isLinked = linkStatus === 'LINKED';

        return {
          questionArchiveId: id,
          interviewQuestionId: 1000 + id,
          applicationId: isLinked ? (id % 5) + 1 : null,
          company: isLinked
            ? faker.helpers.arrayElement([
                '네이버',
                '카카오',
                '라인',
                '쿠팡',
                '우아한형제들',
              ])
            : null,
          interviewType: faker.helpers.arrayElement(INTERVIEW_DROPDOWN_OPTIONS)
            .value,
          question:
            faker.helpers.arrayElement([
              '지원하게 된 동기',
              '강점과 약점',
              '갈등 해결 경험',
              'Virtual DOM의 원리',
              '프로젝트 중 어려웠던 점',
            ]) + ` (ID: ${id})`,
          memo: '테스트 메모입니다.',
          createdAt: new Date().toISOString(),
        };
      });
    };

    let allQuestions = generateTotalData(60);

    // 필터링 로직
    if (query) {
      allQuestions = allQuestions.filter((q) => {
        // 질문 내용은 공통 검색
        const matchQuestion = q.question.includes(query);
        // 연동된 질문일 경우 회사명도 검색 범위에 포함
        const matchCompany =
          linkStatus === 'LINKED' && q.company?.includes(query);

        return matchQuestion || matchCompany;
      });
    }

    const startIndex = cursor
      ? allQuestions.findIndex((q) => q.questionArchiveId === Number(cursor)) +
        1
      : 0;

    const contents = allQuestions.slice(startIndex, startIndex + limit);
    const hasNext = startIndex + limit < allQuestions.length;
    const nextCursorId = hasNext
      ? contents[contents.length - 1].questionArchiveId
      : null;

    return HttpResponse.json({
      contents,
      hasNext,
      nextCursorId,
    });
  }),
];
