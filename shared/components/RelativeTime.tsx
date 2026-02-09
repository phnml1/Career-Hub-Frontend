import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface RelativeTimeProps {
  date: string | Date;
  className?: string;
}

export default function RelativeTime({ date, className }: RelativeTimeProps) {
  const d = typeof date === 'string' ? new Date(date) : date;

  return (
    <time dateTime={d.toISOString()} className={className}>
      {formatDistanceToNow(d, {
        addSuffix: true, // '전' 또는 '후'를 자동으로 붙여줌
        locale: ko, // 한국어 설정
      })}
    </time>
  );
}
