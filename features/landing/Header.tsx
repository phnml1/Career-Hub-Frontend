import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/career-hub-logo.png';
import { Button } from '@/shared/components/ui/button';

export default function Header() {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800'>
      <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
        <Link href='/'>
          <Image src={Logo} alt='CareerHub Logo' className='h-12 w-auto' />
        </Link>

        {/* Auth Buttons */}
        <div className='flex items-center gap-4'>
          <Button
            asChild
            variant='default'
            size='lg'
            className='font-semibold text-base'
          >
            <Link href='/login'>로그인</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
