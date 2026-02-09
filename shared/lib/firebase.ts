import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage, type Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 브라우저 환경에서만 messaging 초기화
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

// Service Worker 등록
async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('Service Worker 등록 성공:', registration);
    return registration;
  } catch (error) {
    console.error('Service Worker 등록 실패:', error);
    return null;
  }
}

// 알림 권한 요청
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    console.warn('이 브라우저는 알림을 지원하지 않습니다.');
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  console.log('알림 권한 상태:', permission);
  return permission;
}

// FCM 토큰 발급
export async function getFCMToken(): Promise<string | null> {
  if (!messaging) {
    console.warn('Messaging이 초기화되지 않았습니다.');
    return null;
  }

  try {
    // 알림 권한 확인
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.warn('알림 권한이 거부되었습니다.');
      return null;
    }

    // Service Worker 등록
    const registration = await registerServiceWorker();
    if (!registration) {
      console.error('Service Worker를 등록할 수 없습니다.');
      return null;
    }

    // FCM 토큰 발급
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log('FCM 토큰 발급 성공:', token);
      return token;
    } else {
      console.warn('FCM 토큰을 가져올 수 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('FCM 토큰 발급 실패:', error);
    return null;
  }
}

// 포그라운드 메시지 리스너 설정
export function setupForegroundMessageListener(
  callback: (payload: {
    notification?: { title?: string; body?: string };
    data?: Record<string, string>;
  }) => void
): (() => void) | null {
  if (!messaging) {
    console.warn('Messaging이 초기화되지 않았습니다.');
    return null;
  }

  const unsubscribe = onMessage(messaging, (payload) => {
    console.log('[FCM] 포그라운드 메시지 수신:', payload);
    callback(payload);
  });

  return unsubscribe;
}

export { getToken, onMessage };