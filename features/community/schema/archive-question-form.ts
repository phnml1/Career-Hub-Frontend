import { z } from 'zod';

const baseArchiveQuestionSchema = z.object({
  interviewQuestionId: z.number().min(1, '보관할 질문 ID가 유효하지 않습니다'),
  question: z.string().min(1, '질문 내용이 없습니다'),
  interviewType: z.string().min(1, '면접 유형을 선택해주세요'),
  memo: z.string().optional(),
});

export const archiveQuestionSchema = z.discriminatedUnion('isLinked', [
  // 상황 1: 지원 관리 연동함 (isLinked: true)
  baseArchiveQuestionSchema.extend({
    isLinked: z.literal(true),
    applicationId: z
      .number({ error: '지원 공고를 선택해주세요.' })
      .min(1, '지원 공고를 선택해주세요.')
      .optional() // 초기 undefined 허용
      .refine((val) => val !== undefined, '지원 공고를 선택해주세요.'),
  }),

  // 상황 2: 지원 관리 연동 안 함 (isLinked: false)
  baseArchiveQuestionSchema.extend({
    isLinked: z.literal(false),
    applicationId: z.literal(null), // 명세서대로 null 강제
  }),
]);

export type ArchiveFormValues = z.infer<typeof archiveQuestionSchema>;
