import { http, HttpResponse } from 'msw';

import { ENV } from '@/shared/constants/env';

export const interviewsHandlers = [
  http.get(`${ENV.BFF_API_URL}/v1/schedules/upcoming`, () => {
    const now = new Date();

    const getRelativeDate = (days: number, hours: number = 23) => {
      const date = new Date(now);
      date.setDate(now.getDate() + days);
      date.setHours(hours, 59, 59, 999);
      return date.toISOString();
    };

    return HttpResponse.json({
      items: [
        {
          id: 1,
          applicationId: 101,
          companyName: '토스 (Viva Republica)',
          stageType: 'INTERVIEW',
          scheduleName: '1차 직무 인터뷰',
          location: '온라인 (Zoom)',
          // [CASE 1] 오늘 일정 (D-Day)
          startedAt: getRelativeDate(0, 14), // 오늘 오후 2시
          scheduleResult: 'WAITING',
        },
        {
          id: 2,
          applicationId: 102,
          companyName: 'LINE',
          stageType: 'INTERVIEW',
          scheduleName: '기술 면접',
          location: '라인 서현 오피스',
          // [CASE 2] 내일 일정 (D-1 / 긴급)
          startedAt: getRelativeDate(1, 10), // 내일 오전 10시
          scheduleResult: 'WAITING',
        },
        {
          id: 3,
          applicationId: 103,
          companyName: '당근',
          stageType: 'INTERVIEW',
          scheduleName: '팀 컬처 인터뷰',
          location: '온라인',
          // [CASE 3] 임박한 일정 (D-3 / 긴급 경계선)
          startedAt: getRelativeDate(3, 16), // 3일 후 오후 4시
          endedAt: getRelativeDate(3, 17),
          scheduleResult: 'WAITING',
        },
        {
          id: 4,
          applicationId: 104,
          companyName: '현대자동차',
          stageType: 'ETC',
          scheduleName: '인적성 검사',
          location: '양재 본사',
          // [CASE 4] 여유 있는 일정 (D-7)
          startedAt: getRelativeDate(7, 13), // 1주일 후 오후 1시
          endedAt: getRelativeDate(7, 15),
          scheduleResult: 'WAITING',
        },
      ],
      hasNext: false,
      nextCursorId: null,
    });
  }),
];
