/**
 * iOS 디바이스인지 확인
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/**
 * PWA로 설치되어 실행 중인지 확인 (홈 화면에서 실행)
 */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
}

/**
 * iOS PWA인지 확인
 */
export function isIOSPWA(): boolean {
  return isIOS() && isStandalone();
}

/**
 * 웹 푸시 알림이 지원되는 환경인지 확인
 */
export function isWebPushSupported(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // 기본 조건: Notification API와 Service Worker 지원
  const hasBasicSupport =
    'Notification' in window && 'serviceWorker' in navigator;

  if (!hasBasicSupport) {
    return false;
  }

  // iOS인 경우: PWA로 설치되어 있어야만 지원
  if (isIOS()) {
    return isStandalone();
  }

  return true;
}
