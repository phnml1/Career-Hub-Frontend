/** 전형 단계 타입 (API Available values 기반) */
export type StageType = 'DOCUMENT' | 'ETC' | 'INTERVIEW' | 'APPLICATION_CLOSE';

/** 결과 기준 필터 타입 (선택 사항) */
export type ResultCriteria = 'STAGE_PASS' | 'FINAL_PASS' | 'FINAL_FAIL';

/** 서류 상태 필터 타입 (선택 사항) */
export type SubmissionStatus = 'NOT_SUBMITTED' | 'SUBMITTED';
