import { http, HttpResponse } from 'msw';

import { ENV } from '@/shared/constants/env';
import { fakerKO as faker } from '@faker-js/faker';

const STAGE_TYPES = [
  'DOCUMENT',
  'ETC',
  'INTERVIEW',
  'APPLICATION_CLOSE',
] as const;

export const calendarHandlers = [
  http.get(`${ENV.BFF_API_URL}/v1/schedules`, async ({ request }) => {
    const url = new URL(request.url);
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const companyName = url.searchParams.get('companyName');
    const stageTypes = url.searchParams.get('stageTypes')?.split(',') || [];

    // 필차 파라미터 체크 (Bad Request 시뮬레이션)
    if (!from || !to) {
      return HttpResponse.json(
        { statusCode: 400, message: 'from, to 파라미터는 필수입니다.' },
        { status: 400 },
      );
    }

    const startDateRange = new Date(from);
    const endDateRange = new Date(to);

    // 데이터 생성 로직
    const generateSchedules = (count: number) => {
      return Array.from({ length: count }, (_, i) => {
        // from ~ to 사이의 랜덤 날짜 생성
        const startedAtDate = faker.date.between({
          from: startDateRange,
          to: endDateRange,
        });

        // 일정 종료 시간: 시작 시간으로부터 30분 ~ 2시간 사이 랜덤 추가
        const endedAtDate = new Date(
          startedAtDate.getTime() +
            faker.number.int({ min: 30, max: 120 }) * 60 * 1000,
        );

        // 서류 마감일: 일정 시작일로부터 1~7일 전 랜덤 생성
        const submissionDeadlineDate = faker.date.recent({
          days: 7,
          refDate: startedAtDate,
        });

        const stageType = faker.helpers.arrayElement(STAGE_TYPES);

        return {
          scheduleId: i + 1,
          applicationId: faker.number.int({ min: 100, max: 999 }),
          companyName: companyName || faker.company.name(),
          stageType: stageType,
          submissionStatus: faker.helpers.arrayElement([
            'NOT_SUBMITTED',
            'SUBMITTED',
          ]),
          submissionDeadline: submissionDeadlineDate.toISOString(),
          scheduleName: `${faker.helpers.arrayElement([
            '면접 전형 종류 및 직접 입력 이름',
            '기타 전형 명',
          ])}`,
          startedAt: startedAtDate.toISOString(),
          endedAt: endedAtDate.toISOString(),
          location:
            faker.location.city() + ' ' + faker.location.streetAddress(),
        };
      }).sort(
        (a, b) =>
          new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime(), // 오름차순 정렬
      );
    };

    const items = generateSchedules(30);

    const targetDate = new Date(startDateRange);
    targetDate.setDate(targetDate.getDate() + 2); // 시작일로부터 2일 뒤

    const heavyDaySchedules = Array.from({ length: 5 }, (_, i) => {
      const startedAt = new Date(targetDate);
      startedAt.setHours(10 + i, 0, 0); // 10시, 11시, 12시... 순차적 배치

      return {
        scheduleId: 1000 + i,
        applicationId: faker.number.int({ min: 100, max: 999 }),
        companyName: `밀집기업 ${i + 1}`,
        stageType: faker.helpers.arrayElement(STAGE_TYPES),
        submissionStatus: 'SUBMITTED',
        submissionDeadline: new Date().toISOString(),
        scheduleName: '강제 생성 일정',
        startedAt: startedAt.toISOString(),
        endedAt: new Date(startedAt.getTime() + 60 * 60 * 1000).toISOString(),
        location: '강남역 인근',
      };
    });

    const finalItems = [...items, ...heavyDaySchedules].sort(
      (a, b) =>
        new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime(),
    );

    return HttpResponse.json({ items: finalItems });
  }),
];
