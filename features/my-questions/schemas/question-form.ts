import * as z from 'zod';

const baseSchema = z.object({
  interviewType: z.string().min(1, '면접 종류를 선택해주세요.'),
  question: z.string().min(1, '면접 질문을 입력해주세요.'),
  memo: z.string().optional().or(z.literal('')), // 빈 문자열 허용
});

export const questionFormSchema = z.discriminatedUnion('isLinked', [
  // 1. 지원관리 연동 케이스
  baseSchema.extend({
    isLinked: z.literal(true),
    applicationId: z
      .number({ error: '지원 공고를 선택해주세요.' })
      .min(1, '지원 공고를 선택해주세요.')
      .optional() // 초기 undefined 허용
      .refine((val) => val !== undefined, '지원 공고를 선택해주세요.'),
  }),

  // 2. 지원관리 미연동 (나만의 질문) 케이스
  baseSchema.extend({
    isLinked: z.literal(false),
    applicationId: z.literal(null), // 반드시 null이어야 함
  }),
]);

export type QuestionFormValues = z.infer<typeof questionFormSchema>;
