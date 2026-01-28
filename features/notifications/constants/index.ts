export const NOTIFICATION_SECTIONS = [
  {
    id: 'recruitment',
    title: '서류 전형 마감일 알림',
    items: [
      {
        id: 'DEADLINE_D7',
        label: '서류 전형 마감 7일 전 알림',
        desc: '서류 전형 마감 일주일 전에 리마인드 알림을 받습니다.',
      },
      {
        id: 'DEADLINE_D3',
        label: '서류 전형 마감 3일 전 알림',
        desc: '서류 전형 마감 제출 준비를 마무리할 수 있도록 3일 전에 알려드립니다.',
      },
      {
        id: 'DEADLINE_D1',
        label: '서류 전형 마감 1일 전 (D-1) 알림',
        desc: '서류 전형 마감 하루 전, 긴급 알림을 받습니다.',
      },
    ],
  },
  {
    id: 'interview',
    title: '면접 일정 알림',
    items: [
      {
        id: 'INTERVIEW_D3',
        label: '면접 일정 3일 전 알림',
        desc: '면접 일정 준비를 시작할 수 있도록 3일 전에 알려드립니다.',
      },
      {
        id: 'INTERVIEW_D1',
        label: '면접 일정 1일 전 (D-1) 알림',
        desc: '면접 일정 하루 전, 최종 점검을 위한 알림을 받습니다.',
      },
      {
        id: 'INTERVIEW_DAY_9AM',
        label: '면접 일정 당일 오전 9시 알림',
        desc: '면접 일정 당일 아침에 응원 알림을 보냅니다.',
      },
      {
        id: 'INTERVIEW_1H_BEFORE',
        label: '면접 일정 1시간 전 알림',
        desc: '면접 일정 시작 1시간 전에 준비 알림을 받습니다.',
      },
    ],
  },
  {
    id: 'etc',
    title: '기타 전형 일정 알림',
    items: [
      {
        id: 'ETC_D3',
        label: '기타 전형 일정 3일 전 알림',
        desc: '기타 전형 일정 준비를 시작할 수 있도록 3일 전에 알려드립니다.',
      },
      {
        id: 'ETC_D1',
        label: '기타 전형 일정 1일 전 (D-1) 알림',
        desc: '기타 전형 일정 하루 전, 일정 점검을 위한 알림을 받습니다.',
      },
      {
        id: 'ETC_DAY_9AM',
        label: '기타 전형 일정 당일 오전 9시 알림',
        desc: '기타 전형 일정 당일, 아침에 응원 알림을 보냅니다.',
      },
    ],
  },
] as const;

export type NotificationEventId =
  (typeof NOTIFICATION_SECTIONS)[number]['items'][number]['id'];
