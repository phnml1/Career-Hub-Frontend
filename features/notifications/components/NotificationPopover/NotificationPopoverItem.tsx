'use client';

import { Trash2 } from 'lucide-react';
import { Notification } from '../../types';
import { RelativeTime } from '@/shared/components/RelativeTime';
import { getNotificationIcon } from './notificationIcon';

interface NotificationPopoverItemProps {
  notification: Notification;
  onRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function NotificationPopoverItem({
  notification,
  onRead,
  onDelete,
}: NotificationPopoverItemProps) {
  const handleClick = () => {
    if (!notification.is_read) {
      onRead(notification.notificationId);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(notification.notificationId);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group flex gap-3 ${
        notification.is_read
          ? 'opacity-60'
          : 'bg-brand-50/10 dark:bg-brand-900/10'
      }`}
    >
      <div className='mt-0.5 flex-shrink-0'>
        {getNotificationIcon(notification.type)}
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between items-start mb-1'>
          <h4
            className={`text-sm font-bold truncate ${
              notification.is_read
                ? 'text-slate-600 dark:text-slate-400'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {notification.title}
          </h4>
          <span className='text-[10px] text-slate-400 whitespace-nowrap ml-2'>
            <RelativeTime date={notification.createdAt} />
          </span>
        </div>
        <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2'>
          {notification.message}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className='opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all self-center'
      >
        <Trash2 className='w-4 h-4' />
      </button>
    </div>
  );
}
