import { clientApi } from '@/shared/lib/api/clientApi';
import { PutNotificationPreferenceRequest } from '../types';

export const putNotificationPreference = ({
  platform,
  event,
  enabled,
}: PutNotificationPreferenceRequest): Promise<void> => {
  return clientApi.put('/v1/notifications/preferences', {
    platform,
    event,
    enabled,
  });
};
