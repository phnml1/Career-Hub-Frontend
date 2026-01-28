import * as z from 'zod';

export const questionFormSchema = z.object({
  // 수정 시에만 존재
  questionArchiveId: z.number().optional(),

  applicationId: z.number().nullable(),
  interviewQuestionId: z.number().nullable(),

  interviewType: z.string().min(1, '면접 종류를 선택해주세요.'),
  question: z.string().min(1, '면접 질문을 입력해주세요.'),

  memo: z.string().optional(),
});

export type QuestionFormValues = z.infer<typeof questionFormSchema>;
