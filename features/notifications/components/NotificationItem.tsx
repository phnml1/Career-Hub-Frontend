'use client';

import {
  Calendar,
  AlertCircle,
  Info,
  Trash2,
  LucideIcon,
  RefreshCw,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Notification, NotificationType } from '../types';
import { useReadNotification } from '../hooks/useReadNotification';
import { useDeleteNotification } from '../hooks/useDeleteNotification';
import { formatDateTime } from '@/shared/lib/utils';

const NOTIFICATION_ICONS: Record<NotificationType, LucideIcon> = {
  INTERVIEW_REMINDER: Calendar,
  DOCUMENT_DEADLINE: AlertCircle,
  STATUS_CHANGE: RefreshCw,
  SCHEDULE_REMINDER: Info,
};

export default function NotificationItem({
  notificationId,
  type,
  title,
  message,
  is_read,
  createdAt,
  targetId,
}: Notification) {
  const router = useRouter();
  const { mutate: readNotification } = useReadNotification();
  const { mutate: deleteNotification } = useDeleteNotification();

  const Icon = NOTIFICATION_ICONS[type] || Info;

  const handleClick = () => {
    if (!is_read) {
      readNotification(notificationId);
    }
    router.push(`/applications/${targetId}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(notificationId);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-5 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group ${
        !is_read ? 'bg-brand-50/20 dark:bg-brand-900/10' : ''
      }`}
    >
      <div className="mt-1 flex-shrink-0 bg-white dark:bg-slate-800 p-2 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm h-fit">
        <Icon className="w-5 h-5 text-brand-500" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-bold mb-1 truncate sm:pr-4 text-slate-900 dark:text-slate-100">
            {title}
            {!is_read && (
              <span className="ml-2 inline-block w-2 h-2 rounded-full bg-red-500 align-middle" />
            )}
          </h3>
          {/* 데스크톱: 오른쪽에 날짜 표시 */}
          <span className="hidden sm:block text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
            {formatDateTime(createdAt)}
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {message}
        </p>
        {/* 모바일: 아래에 날짜 표시 */}
        <span className="sm:hidden text-xs text-slate-400 mt-2 block">
          {formatDateTime(createdAt)}
        </span>
      </div>

      <button
        onClick={handleDelete}
        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-100 md:opacity-0 group-hover:opacity-100 self-center"
        title="삭제"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
