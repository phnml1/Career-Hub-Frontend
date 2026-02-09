import Link from 'next/link';
import Image from 'next/image';

import Logo from '@/assets/career-hub-logo.png';
import IconLogo from '@/assets/career-hub-only-icon.png';
import { cn } from '@/shared/lib/utils';

export const SidebarLogo = ({ isExpanded }: { isExpanded: boolean }) => (
  <div className='h-12 flex items-center'>
    <Link href='/' className='flex justify-start items-center'>
      <Image
        src={isExpanded ? Logo : IconLogo}
        alt='logo'
        priority
        className={cn(
          'object-contain transition-all duration-300 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]',
          isExpanded ? 'w-32' : 'w-12',
        )}
      />
    </Link>
  </div>
);
