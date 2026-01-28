'use client';

import DeniedModal from './DeniedModal';
import IOSSafariModal from './IOSSafariModal';
import PermissionRequestModal from './PermissionRequestModal';

interface NotificationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
  isIOSSafari?: boolean;
  isDenied?: boolean;
}

export default function NotificationPermissionModal({
  isOpen,
  onClose,
  onAllow,
  isIOSSafari = false,
  isDenied = false,
}: NotificationPermissionModalProps) {
  // 알림이 차단된 경우
  if (isDenied) {
    return <DeniedModal isOpen={isOpen} onClose={onClose} />;
  }

  // iOS Safari: PWA 설치 안내
  if (isIOSSafari) {
    return <IOSSafariModal isOpen={isOpen} onClose={onClose} />;
  }

  // 일반 알림 권한 요청 모달
  return (
    <PermissionRequestModal
      isOpen={isOpen}
      onClose={onClose}
      onAllow={onAllow}
    />
  );
}
