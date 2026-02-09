import { clientApi } from '@/shared/lib/api/clientApi';
import { useMutation } from '@tanstack/react-query';

interface RegisterFCMTokenRequest {
  platform: 'WEB';
  token: string;
  deviceId: string;
}

function getDeviceId(): string {
  const STORAGE_KEY = 'fcm_device_id';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;

  const id = crypto.randomUUID();
  localStorage.setItem(STORAGE_KEY, id);
  return id;
}

export function useRegisterFCMToken() {
  return useMutation({
    mutationFn: async (token: string) => {
      const deviceId = getDeviceId();
      console.log('[FCM] 토큰 등록 요청:', { platform: 'WEB', token: token.slice(0, 20) + '...', deviceId });
      return clientApi.post<void>('/v1/notifications/devices', {
        platform: 'WEB',
        token,
        deviceId,
      } satisfies RegisterFCMTokenRequest);
    },
    onError: (error) => {
      console.error('[FCM] 토큰 등록 실패:', error);
    },
  });
}
