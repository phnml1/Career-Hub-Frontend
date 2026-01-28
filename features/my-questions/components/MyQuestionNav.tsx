'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Link2, Link2Off } from 'lucide-react';

export default function MyQuestionsNav() {
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type') || 'linked'; // 기본값 '연동'

  return (
    <Tabs value={currentType} className='w-full mb-6'>
      <TabsList className='flex flex-col md:flex-row p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 h-auto'>
        <Link href='?type=linked' className='flex-1 md:flex-none'>
          <TabsTrigger
            value='linked'
            className='w-full px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2.5 data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-lg dark:data-[state=active]:bg-slate-700'
          >
            <Link2 className='w-4 h-4' /> 지원 관리와 연동된 면접 질문
          </TabsTrigger>
        </Link>

        <Link href='?type=unlinked' className='flex-1 md:flex-none'>
          <TabsTrigger
            value='unlinked'
            className='w-full px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2.5 data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-lg dark:data-[state=active]:bg-slate-700 text-slate-500'
          >
            <Link2Off className='w-4 h-4' /> 일반 질문 (지원 관리와 연동되지
            않은 면접 질문)
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
