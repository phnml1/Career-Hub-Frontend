'use client';

import { usePathname } from 'next/navigation';
import { SidebarNavItem } from './SidebarNavItem';
import { MENU_GROUPS } from '../../constants';
import { useGetNotifications } from '@/features/notifications/hooks/useGetNotifications';
import { useMemo } from 'react';

interface SidebarNavProps {
  isExpanded: boolean;
}

export function SidebarNav({ isExpanded }: SidebarNavProps) {
  const pathname = usePathname();
  const { data: notificationsData } = useGetNotifications();

  const unreadCount = useMemo(() => {
    if (!notificationsData?.pages) return 0;
    return notificationsData.pages
      .flatMap((page) => page.notifications)
      .filter((notification) => !notification.is_read).length;
  }, [notificationsData]);

  return (
    <div className='flex-1 overflow-y-auto space-y-6 scrollbar-hide'>
      {MENU_GROUPS.map((group) => (
        <div key={group.group}>
          {isExpanded && (
            <p className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1'>
              {group.group}
            </p>
          )}
          <nav className='space-y-1'>
            {group.items.map((item) => (
              <SidebarNavItem
                key={item.href}
                {...item}
                count={item.href === '/notifications' ? unreadCount : undefined}
                isActive={pathname === item.href}
                isExpanded={isExpanded}
              />
            ))}
          </nav>
        </div>
      ))}
    </div>
  );
}
