'use client';

import { Link2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Switch } from '@/shared/components/ui/switch';
import { Label } from '@/shared/components/ui/label';

interface LinkToggleProps {
  isOn: boolean;
  onToggle: (checked: boolean) => void;
}

export function LinkToggle({ isOn, onToggle }: LinkToggleProps) {
  return (
    <div
      // 텍스트나 아이콘 영역을 클릭해도 토글이 작동하도록 전체 영역에 이벤트 부여
      onClick={() => onToggle(!isOn)}
      className='flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 group cursor-pointer transition-all active:scale-[0.98]'
    >
      <div className='flex items-center gap-3'>
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
            isOn
              ? 'bg-brand-500 text-white'
              : 'bg-slate-200 text-slate-500 dark:bg-slate-700',
          )}
        >
          <Link2 className='w-5 h-5' />
        </div>
        <div className='flex flex-col'>
          <Label className='text-sm font-black text-slate-900 dark:text-slate-100 cursor-pointer'>
            지원 관리와 연동하기
          </Label>
          <span className='text-[11px] text-slate-400 font-bold uppercase tracking-tight'>
            {isOn
              ? '준비된 지원 관리에 면접 질문을 연동합니다'
              : '지원 관리 연동 없이 일반 면접 질문으로 저장합니다'}
          </span>
        </div>
      </div>

      <Switch
        checked={isOn}
        onCheckedChange={onToggle}
        // Switch 내부 클릭 이벤트가 부모 div의 onClick과 중복되지 않도록 방지
        onClick={(e) => e.stopPropagation()}
        className='data-[state=checked]:bg-brand-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=unchecked]:bg-slate-700'
      />
    </div>
  );
}
