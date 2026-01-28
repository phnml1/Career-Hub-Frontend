import { clientApi } from '@/shared/lib/api/clientApi';
import { GetNotificationPreferencesResponse, PlatformType } from '../types';

export const getNotificationPreferences = (
  platform: PlatformType = 'WEB'
): Promise<GetNotificationPreferencesResponse> => {
  return clientApi.get(`/v1/notifications/preferences?platform=${platform}`);
};
