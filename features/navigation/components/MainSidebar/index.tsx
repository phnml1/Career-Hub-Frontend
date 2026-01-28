'use client';

import { cn } from '@/shared/lib/utils';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import SidebarToggleButton from './SidebarToggleButton';
import { SidebarLogo } from './SidebarLogo';
import { SidebarProfileDropdownMenu } from './SidebarProfileDropdownMenu';
import { SidebarNav } from './SidebarNav';
import { useRouter } from 'next/navigation';

export default function MainSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };
  const router = useRouter();
  return (
    <aside
      className={cn(
        'sticky top-0 h-screen',
        'bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col  gap-y-4 z-20 hidden md:flex flex-shrink-0 transition-all duration-300',
        isExpanded ? 'w-64 p-4' : 'w-20 p-2 items-center',
      )}
    >
      <SidebarToggleButton isExpanded={isExpanded} onClick={toggleSidebar} />
      <SidebarLogo isExpanded={isExpanded} />

      <div>
        <Button
          onClick = {() => {router.push('/applications/new')}}
          className={cn(
            'w-full rounded-3xl shadow-md shadow-brand-200 font-extrabold',
            'hover:-translate-y-0.5 transition-all',
            !isExpanded && 'p-0 size-10 rounded-full',
            isExpanded && 'py-5',
          )}
        >
          <PlusIcon className='size-5' />
          {isExpanded && <span>지원 관리 추가</span>}
        </Button>
      </div>

      {/* 메뉴 리스트 */}
      <SidebarNav isExpanded={isExpanded} />

      {/* 하단 경계선 및 프로필 */}
      <div className='mt-auto pt-2 space-y-4 w-full'>
        <hr
          className={cn(
            'border-t border-border dark:border-slate-800 -mx-4',
            !isExpanded && '-mx-2',
          )}
        />
        <SidebarProfileDropdownMenu isExpanded={isExpanded} />
      </div>
    </aside>
  );
}
