// Firebase Messaging Service Worker
// 백그라운드 푸시 알림을 처리합니다.

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Firebase 설정 (환경변수 대신 직접 설정이 필요합니다)
// TODO: Replace the following with your app's
const firebaseConfig = {
  apiKey: "AIzaSyCIz1JkqqahEFXOrM78tDXKMGvmcXWaHsw",
  authDomain: "career-hub-28926.firebaseapp.com",
  projectId: "career-hub-28926",
  storageBucket: "career-hub-28926.firebasestorage.app",
  messagingSenderId: "784355645472",
  appId: "1:784355645472:web:b0bd22313959e6f8188445",
  measurementId: "G-YB0G58XR7T"
};
// Firebase 초기화
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 백그라운드 메시지 수신 처리
messaging.onBackgroundMessage(async (payload) => {
  console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신:', payload);

  try {
    // notification 필드 또는 data 필드에서 정보 추출
    const notification = payload.notification || {};
    const data = payload.data || {};

    const notificationTitle = notification.title || data.title || '새 알림';
    const notificationOptions = {
      body: notification.body || data.body || '',
      icon: '/icon-192x192.png',
      tag: data.tag || 'default',
      data: data,
    };

    console.log('[firebase-messaging-sw.js] 알림 표시 시도:', notificationTitle, notificationOptions);
    console.log('[firebase-messaging-sw.js] self.registration:', self.registration);

    const result = await self.registration.showNotification(notificationTitle, notificationOptions);
    console.log('[firebase-messaging-sw.js] 알림 표시 성공:', result);
  } catch (error) {
    console.error('[firebase-messaging-sw.js] 알림 표시 에러:', error);
  }
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] 알림 클릭:', event);

  event.notification.close();

  const urlToOpen = event.notification.data?.linkUrl || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // 이미 열린 창이 있으면 포커스
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          client.postMessage({
            type: 'NOTIFICATION_CLICK',
            url: urlToOpen,
          });
          return;
        }
      }
      // 열린 창이 없으면 새 창 열기
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
