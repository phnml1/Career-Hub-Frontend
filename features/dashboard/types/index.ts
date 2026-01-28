/**
 * 프론트엔드 도메인 타입
 * 컴포넌트나 상태 관리에서 사용할 '깨끗한' 타입입니다.
 * 필드명이 너무 길거나 구조화가 필요할 때 여기서 정제합니다.
 */
export interface ApplicationStats {
  /**
   * 전체 지원 건수
   */
  totalApplicationCount: number;
  /**
   * 서류 전형 중
   */
  docStageCount: number;
  /**
   * 면접 전형 중
   */
  interviewStageCount: number;
  /**
   * 기타 전형 중
   */
  etcStageCount: number;
  /**
   * 최종 합격
   */
  finalPassedCount: number;
  /**
   * 최종 불합격
   */
  finalFailedCount: number;
}

export type StageType = 'DOCUMENT' | 'ETC' | 'INTERVIEW' | 'APPLICATION_CLOSE';

export type ScheduleResult = 'WAITING' | 'PASS' | 'FAIL';
