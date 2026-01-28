import { Calendar, CircleAlert, Info } from 'lucide-react';
import { NotificationType } from '../../types';

export function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case 'INTERVIEW_REMINDER':
    case 'SCHEDULE_REMINDER':
      return <Calendar className='w-5 h-5 text-brand-500' />;
    case 'DOCUMENT_DEADLINE':
      return <CircleAlert className='w-5 h-5 text-red-500' />;
    case 'STATUS_CHANGE':
    default:
      return <Info className='w-5 h-5 text-blue-500' />;
  }
}
