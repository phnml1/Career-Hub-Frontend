import { GetApplicationCreationStatisticsResponse } from '@/features/dashboard/api/getApplicationCreationStatistics';
import { ENV } from '@/shared/constants/env';
import { endOfWeek, format, startOfWeek, subMonths, subWeeks } from 'date-fns';
import { http, HttpResponse } from 'msw';

export const applicationHandlers = [
  http.get(`${ENV.BFF_API_URL}/applications`, () => {
    return HttpResponse.json();
  }),

  http.get(`${ENV.BFF_API_URL}/v1/applications/statistics`, () => {
    return HttpResponse.json({
      totalApplicationCount: 100,
      docStageCount: 45,
      etcStageCount: 20,
      interviewStageCount: 15,
      finalPassedCount: 8,
      finalFailedCount: 12,
    });
  }),

  http.get(`${ENV.BFF_API_URL}/v1/applications/before-deadline`, () => {
    const now = new Date();

    // 날짜 계산 헬퍼 함수
    const getRelativeDate = (days: number, hours: number = 23) => {
      const date = new Date(now);
      date.setDate(now.getDate() + days);
      date.setHours(hours, 59, 59, 999);
      return date.toISOString();
    };

    return HttpResponse.json({
      contents: [
        {
          applicationId: 101,
          company: 'Naver',
          position: 'Frontend Developer',
          deadline: getRelativeDate(0), // 오늘 마감 (D-Day),
          applicationMethod: '홈페이지 접수',
          submissionStatus: '제출 완료',
        },
        {
          applicationId: 102,
          company: 'Toss',
          position: 'Product Designer',
          deadline: getRelativeDate(1), // 내일 마감 (D-1),
          applicationMethod: '이메일 지원',
          submissionStatus: '미제출',
        },
        {
          applicationId: 103,
          company: 'Naver',
          position: 'Frontend Developer',
          deadline: getRelativeDate(14),
          applicationMethod: '홈페이지 접수',
          submissionStatus: '제출 완료',
        },
        {
          applicationId: 104,
          company: 'Toss',
          position: 'Product Designer',
          deadline: getRelativeDate(-2), // 마감됨
          applicationMethod: '이메일 지원',
          submissionStatus: '미제출',
        },
      ],
      hasNext: false,
      nextCursorId: null,
    });
  }),

  http.get(
    `${ENV.BFF_API_URL}/v1/applications/statistics/creation`,
    ({ request }) => {
      const url = new URL(request.url);
      const weekCount = Number(url.searchParams.get('weekCount')) || 6;
      const monthCount = Number(url.searchParams.get('monthCount')) || 6;

      const now = new Date();

      // 주간 데이터 생성 (실제 날짜 계산)
      const weeklyStatistics = Array.from({ length: weekCount }, (_, i) => {
        const targetDate = subWeeks(now, i);
        const start = startOfWeek(targetDate, { weekStartsOn: 1 }); // 월요일 시작
        const end = endOfWeek(targetDate, { weekStartsOn: 1 }); // 일요일 종료

        return {
          period: `${format(start, 'MM.dd')} - ${format(end, 'MM.dd')}`,
          count: Math.floor(Math.random() * 10),
          isCurrentWeek: i === 0,
        };
      }).reverse();

      // 2. 월간 데이터 생성 (실제 날짜 계산)
      const monthlyStatistics = Array.from({ length: monthCount }, (_, i) => {
        const targetDate = subMonths(now, i);

        return {
          period: format(targetDate, 'yyyy.MM'),
          count: Math.floor(Math.random() * 30) + 10,
          isCurrentMonth: i === 0,
        };
      }).reverse();

      return HttpResponse.json<GetApplicationCreationStatisticsResponse>({
        weeklyStatistics,
        monthlyStatistics,
      });
    },
  ),

  // GET /v1/applications/dropdown 핸들러
  http.get(`${ENV.BFF_API_URL}/v1/applications/dropdown`, () => {
    return HttpResponse.json(
      [
        {
          id: 123,
          company: 'Google',
          position: 'Software Engineer',
        },
        {
          id: 124,
          company: 'Toss',
          position: 'Frontend Developer',
        },
        {
          id: 125,
          company: 'Naver',
          position: 'Web Engineer',
        },
        {
          id: 126,
          company: 'Kakao',
          position: 'Fullstack Developer',
        },
      ],
      { status: 200 },
    );
  }),
];
