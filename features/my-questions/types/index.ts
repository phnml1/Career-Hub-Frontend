/**
 * 지원 관리 연동 여부
 * LINKED === 지원 관리 연동된 면접 질문
 * UNLINKED === 지원 관리 연동안된 일반 면접 질문
 */
export type LinkStatus = 'LINKED' | 'UNLINKED';
export interface Question {
  questionArchiveId: number;
  interviewQuestionId: number;
  applicationId: number | null;
  company: string;
  interviewType: string;
  question: string;
  memo: string;
  createdAt: string;
}
