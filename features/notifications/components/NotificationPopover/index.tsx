'use client';

import { Check, Settings, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useGetNotifications } from '../../hooks/useGetNotifications';
import { useNotificationPopoverStore } from '../../stores/useNotificationPopoverStore';
import { useReadNotification } from '../../hooks/useReadNotification';
import { useReadAllNotifications } from '../../hooks/useReadAllNotifications';
import { useDeleteNotification } from '../../hooks/useDeleteNotification';
import NotificationPopoverItem from './NotificationPopoverItem';

export default function NotificationPopover() {
  const { data } = useGetNotifications(10);
  const { mutate: readNotification } = useReadNotification();
  const { mutate: readAllNotifications } = useReadAllNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { close } = useNotificationPopoverStore();
  const router = useRouter();

  const notifications = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.notifications);
  }, [data]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.is_read).length;
  }, [notifications]);

  const handleRead = (id: number) => {
    readNotification(id);
    close();
  };

  const handleDelete = (id: number) => {
    deleteNotification(id);
  };

  const handleReadAll = () => {
    readAllNotifications();
  };

  const handleRouting = () => {
    router.push('/notifications');
    close();
  };

  return (
    <div className='bg-white dark:bg-slate-900 rounded-2xl overflow-hidden'>
      {/* Header */}
      <div className='p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50'>
        <h3 className='font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
          알림
          {unreadCount > 0 && (
            <span className='text-xs font-normal text-slate-500 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-600'>
              {unreadCount}
            </span>
          )}
        </h3>
        <div className='flex items-center space-x-1'>
          <button
            onClick={handleReadAll}
            className='p-1.5 text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors'
            title='모두 읽음'
          >
            <Check className='w-4 h-4' />
          </button>
          <Link
            href='/notifications/settings'
            className='p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors'
            title='설정'
          >
            <Settings className='w-4 h-4' />
          </Link>
        </div>
      </div>

      {/* Notification List */}
      <div className='max-h-[350px] overflow-y-auto'>
        {notifications.length === 0 ? (
          <div className='p-8 text-center text-slate-400 text-sm'>
            알림이 없습니다
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationPopoverItem
              key={notification.notificationId}
              notification={notification}
              onRead={handleRead}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className='p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30'>
        <div
          onClick={handleRouting}
          className='w-full py-2 text-xs font-bold text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center'
        >
          알림 전체 보기
          <ChevronRight className='w-3 h-3 ml-1' />
        </div>
      </div>
    </div>
  );
}
