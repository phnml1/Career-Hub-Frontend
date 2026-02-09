import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

export default function MobileFloatingActionButton() {
  return (
    <Button
      asChild
      className='md:hidden fixed bottom-20 right-4 w-14 h-14 bg-brand-500 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-brand-600 transition-transform active:scale-95 z-40 border-4 border-slate-50 dark:border-slate-800'
    >
      <Link href='/applications/new'>
        <PlusIcon className='size-8!' />
        <span className='hidden'>지원 관리 추가</span>
      </Link>
    </Button>
  );
}
