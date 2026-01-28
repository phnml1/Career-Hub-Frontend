export interface QuestionItem {
  questionArchiveId: number;
  interviewQuestionId: number;
  applicationId: number | null;
  company: string | null;
  interviewType: string;
  question: string;
  memo: string;
  createdAt: string;
}

export interface GetQuestionsResponse {
  contents: QuestionItem[];
  hasNext: boolean;
  nextCursorId: number | null;
}

/**
 * 지원 관리 연동 여부
 * LINKED === 지원 관리 연동된 면접 질문
 * UNLINKED === 지원 관리 연동안된 일반 면접 질문
 */
export type LinkStatus = 'LINKED' | 'UNLINKED';
