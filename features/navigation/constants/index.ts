import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  CalendarIcon,
  BookMarkedIcon,
  UsersIcon,
  BellIcon,
  SettingsIcon,
  LucideIcon,
} from 'lucide-react';

export const MENU_GROUPS = [
  {
    group: '지원 관리',
    items: [
      { name: '대시보드', href: '/dashboard', icon: LayoutDashboardIcon },
      { name: '지원 현황', href: '/applications', icon: BriefcaseIcon },
      { name: '캘린더', href: '/calendar', icon: CalendarIcon },
    ],
  },
  {
    group: '탐색 및 준비',
    items: [
      { name: '면접 질문', href: '/questions', icon: BookMarkedIcon },
      { name: '커뮤니티', href: '/community', icon: UsersIcon },
    ],
  },
  {
    group: '시스템',
    items: [
      { name: '알림 센터', href: '/notifications', icon: BellIcon },
      { name: '계정 설정', href: '/settings', icon: SettingsIcon },
    ],
  },
];

export const MOBILE_NAV_ITEMS: {
  href: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { href: '/dashboard', label: '대시보드', icon: LayoutDashboardIcon },
  { href: '/applications', label: '지원 현황', icon: BriefcaseIcon },
  { href: '/calendar', label: '캘린더', icon: CalendarIcon },
  { href: '/questions', label: '면접 질문', icon: BookMarkedIcon },
  { href: '/community', label: '커뮤니티', icon: UsersIcon },
];
