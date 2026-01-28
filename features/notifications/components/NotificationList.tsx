'use client';

import { useEffect, useRef } from 'react';
import NotificationItem from './NotificationItem';
import { Notification } from '../types';

interface NotificationListProps {
  notifications: Notification[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export default function NotificationList({
  notifications,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: NotificationListProps) {
  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!observerRef.current || !hasNextPage || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  if (notifications.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="text-slate-500">알림이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden min-h-[400px]">
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.notificationId}
            {...notification}
          />
        ))}
      </div>

      <div ref={observerRef} className="h-1" />

      {isFetchingNextPage && (
        <div className="py-4 text-center text-slate-500">
          불러오는 중...
        </div>
      )}
    </div>
  );
}
