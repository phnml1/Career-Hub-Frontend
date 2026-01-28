'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useFCM, type FCMMessage } from '@/shared/hooks/useFCM';
import { toast } from 'sonner';
import { isIOS, isStandalone, isWebPushSupported } from '@/shared/lib/deviceDetect';
import NotificationPermissionModal from './NotificationPermissionModal';

const NOTIFICATION_MODAL_DISMISSED_KEY = 'notification_modal_dismissed';
const NOTIFICATION_DENIED_MODAL_SHOWN_KEY = 'notification_denied_modal_shown';

export default function FCMInitializer() {
  const queryClient = useQueryClient();
  const hasRequested = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState<boolean | null>(null);
  const [isPWA, setIsPWA] = useState<boolean | null>(null);
  const [isDenied, setIsDenied] = useState(false);

  const handleMessage = useCallback((message: FCMMessage) => {
    // 포그라운드에서 알림 수신 시 토스트로 표시
    if (message.data) {
      toast(message.data.title || '새 알림', {
        description: message.data.body,
      });
    }

    // 알림 목록 query invalidate
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }, [queryClient]);

  const { permission, requestPermissionAndToken } = useFCM({
    onMessage: handleMessage,
  });

  // iOS 및 PWA 감지 (클라이언트에서만)
  useEffect(() => {
    setIsIOSDevice(isIOS());
    setIsPWA(isStandalone());
  }, []);

  useEffect(() => {
    // 디바이스 감지가 완료될 때까지 대기
    if (isIOSDevice === null || isPWA === null) {
      return;
    }

    if (hasRequested.current) {
      return;
    }

    // iOS Safari (PWA 아님): 모달을 띄워 PWA 설치 안내
    if (isIOSDevice && !isPWA) {
      const dismissed = localStorage.getItem(NOTIFICATION_MODAL_DISMISSED_KEY);
      if (!dismissed) {
        hasRequested.current = true;
        const timer = setTimeout(() => {
          setShowModal(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
      return;
    }

    // 웹 푸시가 지원되지 않는 환경이면 종료 (iOS Safari 제외)
    if (!isWebPushSupported()) {
      return;
    }

    // PWA인 경우: 커스텀 모달로 권한 요청
    if (isPWA) {
      // 권한이 denied인 경우: 한 번만 모달 표시 (설정 안내)
      if (permission === 'denied') {
        const deniedShown = localStorage.getItem(NOTIFICATION_DENIED_MODAL_SHOWN_KEY);
        if (!deniedShown) {
          hasRequested.current = true;
          const timer = setTimeout(() => {
            setIsDenied(true);
            setShowModal(true);
          }, 1500);
          return () => clearTimeout(timer);
        }
        return;
      }

      // 권한이 아직 결정되지 않은 경우: 모달을 통해 권한 요청
      if (permission === 'default') {
        const dismissed = localStorage.getItem(NOTIFICATION_MODAL_DISMISSED_KEY);
        if (!dismissed) {
          hasRequested.current = true;
          const timer = setTimeout(() => {
            setShowModal(true);
          }, 1500);
          return () => clearTimeout(timer);
        }
      }

      // 이미 granted인 경우 토큰만 갱신
      if (permission === 'granted') {
        hasRequested.current = true;
        requestPermissionAndToken();
      }
    } else {
      // PWA가 아닌 경우 (일반 브라우저)

      // 권한이 denied인 경우: 한 번만 커스텀 모달 표시 (설정 안내)
      if (permission === 'denied') {
        const deniedShown = localStorage.getItem(NOTIFICATION_DENIED_MODAL_SHOWN_KEY);
        if (!deniedShown) {
          hasRequested.current = true;
          const timer = setTimeout(() => {
            setIsDenied(true);
            setShowModal(true);
          }, 1500);
          return () => clearTimeout(timer);
        }
        return;
      }

      // 권한이 default인 경우: 자동 권한 요청
      if (permission === 'default') {
        hasRequested.current = true;
        const timer = setTimeout(() => {
          requestPermissionAndToken();
        }, 2000);
        return () => clearTimeout(timer);
      }

      // 이미 granted인 경우 토큰만 갱신
      if (permission === 'granted') {
        hasRequested.current = true;
        requestPermissionAndToken();
      }
    }
  }, [permission, requestPermissionAndToken, isIOSDevice, isPWA]);

  const handleAllowNotification = () => {
    // 사용자 클릭 이벤트 내에서 권한 요청 (iOS 필수)
    requestPermissionAndToken();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (isDenied) {
      localStorage.setItem(NOTIFICATION_DENIED_MODAL_SHOWN_KEY, 'true');
    } else {
      localStorage.setItem(NOTIFICATION_MODAL_DISMISSED_KEY, 'true');
    }
  };

  return (
    <NotificationPermissionModal
      isOpen={showModal}
      onClose={handleCloseModal}
      onAllow={handleAllowNotification}
      isIOSSafari={!!isIOSDevice && !isPWA}
      isDenied={isDenied}
    />
  );
}
