import { Button } from '@/shared/components/ui/button';
import { EllipsisIcon, LogOutIcon } from 'lucide-react';
import { useGetMyProfile } from '../../../my-profile/hooks/useGetMyProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import { MyProfileImage } from '@/features/my-profile/components/MyProfileImage';
import { useConfirmStore } from '@/shared/stores/useConfirmStore';

interface SidebarProfileDropdownMenuProps {
  isExpanded: boolean;
}

export const SidebarProfileDropdownMenu = ({
  isExpanded,
}: SidebarProfileDropdownMenuProps) => {
  const { data } = useGetMyProfile();
  const { openConfirm } = useConfirmStore();

  const handleLogout = () => {
    openConfirm({
      title: '로그아웃',
      description: '로그아웃 하시겠습니까?',
      confirmText: '로그아웃',
      onConfirm: () => {
        // TODO 로그아웃 mutate
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='w-full p-2 flex h-auto gap-3'>
          <MyProfileImage />

          {isExpanded && (
            <>
              <div className='flex-1 text-left overflow-hidden'>
                <p className='text-sm font-bold text-slate-900 dark:text-white truncate'>
                  {data?.nickname}님
                </p>
              </div>
              <EllipsisIcon className='w-4 h-4 shrink-0 text-slate-400' />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('w-52', !isExpanded && 'ml-2')}>
        {!isExpanded && (
          <>
            <DropdownMenuLabel>
              <span className='text-brand-500 font-semibold'>
                {data?.nickname}
              </span>
              님 안녕하세요.
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          onClick={handleLogout}
          className={cn(
            'cursor-pointer px-4 py-2.5 text-sm text-red-500 font-medium',
            'hover:bg-red-50 transition-colors focus:bg-red-50 focus:text-red-500',
          )}
        >
          <LogOutIcon className='w-4 h-4 text-red-500' />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
