export type NotificationType =
  | 'INTERVIEW_REMINDER'
  | 'DOCUMENT_DEADLINE'
  | 'STATUS_CHANGE'
  | 'SCHEDULE_REMINDER';

export type SourceType = 'INTERVIEW' | 'APPLICATION' | 'DOCUMENT' | 'SCHEDULE';

export interface Notification {
  notificationId: number;
  type: NotificationType;
  title: string;
  message: string;
  sourceType: SourceType;
  targetId: number;
  is_read: boolean;
  createdAt: string;
}

export interface GetNotificationsParams {
  cursorId?: number;
  size?: number;
}

export interface GetNotificationsResponse {
  notifications: Notification[];
  hasNext: boolean;
  nextCursorId: number | null;
}

// Notification Preferences Types
export type PlatformType = 'WEB' | 'ANDROID' | 'IOS';

export type NotificationEvent =
  | 'DEADLINE_D1'
  | 'DEADLINE_D3'
  | 'DEADLINE_D7'
  | 'INTERVIEW_1H_BEFORE'
  | 'INTERVIEW_D1'
  | 'INTERVIEW_D3'
  | 'INTERVIEW_DAY_9AM'
  | 'ETC_D1'
  | 'ETC_D3'
  | 'ETC_DAY_9AM';

export type NotificationPreferencesMap = Partial<
  Record<NotificationEvent, boolean>
>;

export interface NotificationPreferenceListItem {
  platform: PlatformType;
  event: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetNotificationPreferencesResponse {
  preferences: NotificationPreferenceListItem[];
}

export interface PutNotificationPreferenceRequest {
  platform: PlatformType;
  event: string;
  enabled: boolean;
}
