import { clientApi } from '@/shared/lib/api/clientApi';

/** 마감 전 지원서 개별 아이템 (Response) */
export interface BeforeDeadlineApplicationItemResponse {
  applicationId: number;
  company: string;
  position: string;
  deadline: string; // ISO 8601
  applicationMethod: string;
  submissionStatus: string; // "제출 완료" 등
}

/** 마감 전 지원서 목록 응답 (커서 페이징) */
export interface GetBeforeDeadlineListResponse {
  contents: BeforeDeadlineApplicationItemResponse[];
  hasNext: boolean;
  nextCursorId: number | null;
}

export const getBeforeDeadlineApplications = async () => {
  return clientApi.get<GetBeforeDeadlineListResponse>(
    'v1/applications/before-deadline',
  );
};
