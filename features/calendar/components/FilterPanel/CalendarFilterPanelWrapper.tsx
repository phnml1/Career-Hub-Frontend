'use client';

import { useFilterPanelStore } from '../../stores/useFilterPanelStore';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import CalendarFilterPanel from './CalendarFilterPanel';
import CalendarFilterPanelMobile from './CalendarFilterPanelMobile';

export default function CalendarFilterPanelWrapper() {
  const { isOpen } = useFilterPanelStore();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // 클라이언트 상태에 따라 렌더링 여부 결정
  if (isDesktop) {
    return isOpen ? <CalendarFilterPanel /> : null;
  }

  return <CalendarFilterPanelMobile />;
}
