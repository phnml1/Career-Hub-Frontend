import { View } from 'react-big-calendar';

interface TimeGutterHeaderProps {
  label?: string; // 보통 비어있음

  // 부모(Calendar)에서 components.timeGutterHeader에 넘겨줄 때 추가로 받을 수 있습니다.
  view?: View;
}

export default function TimeGutterHeader({ view }: TimeGutterHeaderProps) {
  return (
    <div className='w-[64px] flex h-full flex-col'>
      {/* 상단 빈 공간 (시간 컬럼과 정렬 맞춤용) 
      주간 캘린더 일때만 공간 활성화 해야함*/}
      <div className='h-[64px] border-b border-border bg-slate-50' />

      {/* 종일 */}
      <div className='flex-1 text-xs font-medium text-muted-foreground flex items-center justify-center'>
        All day
      </div>
    </div>
  );
}
