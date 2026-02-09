import { Link2Icon, Link2OffIcon } from 'lucide-react';

export const NAV_ITEMS = [
  {
    id: 'linked',
    label: '연동 면접 질문',
    icon: Link2Icon,
    description: '지원 관리와 연동된 면접 질문입니다.',
  },
  {
    id: 'unlinked',
    label: '미연동 면접 질문',
    icon: Link2OffIcon,
    description: '지원 관리와 연동되지 않은 면접 질문입니다.',
  },
] as const;
