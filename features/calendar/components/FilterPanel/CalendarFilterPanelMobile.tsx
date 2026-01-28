'use client';

import { Sheet, SheetContent, SheetTitle } from '@/shared/components/ui/sheet';
import { useFilterPanelStore } from '../../stores/useFilterPanelStore';
import FilterPanelContent from './FilterPanelContent';
import { FunnelIcon } from 'lucide-react';

export default function CalendarFilterPanelMobile() {
  const { isOpen, close } = useFilterPanelStore();

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent side='right' className='w-full sm:w-[360px]'>
        <SheetTitle className='p-4 border-b'>
          <span className='font-bold text-slate-900 dark:text-slate-100 flex gap-2 items-center'>
            <FunnelIcon className='w-4 h-4 text-primary' />
            검색 및 필터
          </span>
        </SheetTitle>
        <FilterPanelContent />
      </SheetContent>
    </Sheet>
  );
}
