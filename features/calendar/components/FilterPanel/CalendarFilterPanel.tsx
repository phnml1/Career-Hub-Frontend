'use client';

import { FunnelIcon, PanelRightCloseIcon } from 'lucide-react';
import FilterPanelContent from './FilterPanelContent';
import { useFilterPanelStore } from '../../stores/useFilterPanelStore';
import { Button } from '@/shared/components/ui/button';

/**
 * 데스크탑, 테블릿 (min-width >= 764px)용 필터 패널
 * @returns
 */
export default function CalendarFilterPanel() {
  const close = useFilterPanelStore((state) => state.close);

  return (
    <div className='w-80 bg-background border-l border-border'>
      <div className='flex items-center justify-between p-4 border-b h-17'>
        <div className='flex gap-2 items-center'>
          <FunnelIcon className='w-4 h-4 text-primary stroke-3' />
          <span className='font-black text-slate-900 dark:text-slate-100'>
            검색 및 필터
          </span>
        </div>

        <Button variant='outline' onClick={close}>
          <PanelRightCloseIcon className='w-6 h-6 text-primary stroke-3' />
        </Button>
      </div>

      <FilterPanelContent />
    </div>
  );
}
