import MainSidebar from '@/features/navigation/components/MainSidebar';
import MobileFloatingActionButton from '@/features/navigation/components/MobileFloatingActionButton';
import MobileHeader from '@/features/navigation/components/MobileHeader';
import MobileNav from '@/features/navigation/components/MobileNav';
import FCMInitializer from '@/features/notifications/components/FCMInitializer';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* 사이드바 (데스크탑 전용) */}
      {/* 전체 화면을 꽉 채우는 컨테이너 (스크롤 방지) */}
      <FCMInitializer />
      {/* 사이드바 (데스크탑) */}
      <MainSidebar />
      {/* 모바일 전용 UI (고정 요소들) */}
      <MobileHeader />
      <MobileFloatingActionButton />
      <MobileNav />

      <div className='flex-1 min-h-full bg-slate-50 dark:bg-slate-900/50 pb-[60px] md:pb-0'>
        {children}
      </div>

      {/* Parallel Route - Modal */}
      {modal}
    </div>
  );
}
