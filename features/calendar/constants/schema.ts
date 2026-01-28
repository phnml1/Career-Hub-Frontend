import * as z from 'zod';

const baseSchema = z.object({
  applicationId: z
    .number() // 여기서 인자를 비우면 TS 에러가 나지 않습니다.
    .min(1, '대상 기업을 선택해주세요.'),
  startedAt: z.string().min(1, '시작 일시를 입력해주세요.'),
  scheduleResult: z.string().optional(),
});

export const interviewSchema = baseSchema.extend({
  interviewType: z
    .string()
    .min(1, '면접 종류를 선택하거나 입력해주세요.')
    .refine((val) => val !== 'CUSTOM', {
      message: '면접 종류를 직접 입력해주세요.',
    }),
  location: z.string().min(1, '면접 장소 또는 링크를 입력해주세요.'),
});

export const etcSchema = baseSchema.extend({
  scheduleName: z.string().min(1, '일정 명칭을 입력해주세요.'),
  endedAt: z.string().min(1, '종료 일시를 입력해주세요.'),
});

export type InterviewFormValues = z.infer<typeof interviewSchema>;
export type EtcFormValues = z.infer<typeof etcSchema>;
