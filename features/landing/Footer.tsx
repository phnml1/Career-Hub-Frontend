import Logo from '@/assets/career-hub-logo.png';
import { Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-white dark:bg-slate-950 py-24 border-t border-slate-100 dark:border-slate-800 transition-colors mt-auto'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-16'>
          <Link href='/'>
            <Image src={Logo} alt='CareerHub Logo' className='h-8 w-auto' />
          </Link>

          <div className='flex gap-12 text-sm font-bold text-slate-400'>
            <button className='hover:text-brand-500 transition-colors'>
              이용약관
            </button>
            <button className='hover:text-brand-500 transition-colors'>
              개인정보처리방침
            </button>
            <button className='hover:text-brand-500 transition-colors'>
              문의하기
            </button>
          </div>

          <div className='text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2'>
            <Globe className='w-4 h-4' />© 2024 CareerHub. Smart tools for
            professional growth.
          </div>
        </div>
      </div>
    </footer>
  );
}
