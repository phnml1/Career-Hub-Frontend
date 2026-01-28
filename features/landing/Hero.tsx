import { Button } from '@/shared/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className='pt-44 pb-24 md:pt-60 md:pb-40 px-6'>
      <div className='max-w-5xl mx-auto text-center'>
        {/* Badge */}
        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-10 animate-fade-in-up'>
          <Sparkles className='w-3.5 h-3.5 text-brand-600' />
          <span className='text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.2em]'>
            Next-Gen Career Intelligence
          </span>
        </div>

        {/* Title */}
        <h1 className='text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-10 animate-fade-in-up delay-75'>
          당신의 커리어 흐름을
          <br />
          <span className='text-brand-500'>한 곳에서 완벽하게</span>
        </h1>

        {/* Description */}
        <p className='text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-14 leading-relaxed animate-fade-in-up delay-150 font-medium'>
          흩어져 있는 공고, 면접 일정, 예상 질문들까지.
          <br className='hidden md:block' />
          CareerHub는 구직 활동의 모든 단계를 데이터로 통합하여 관리합니다.
        </p>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300'>
          <Button
            variant='default'
            size='lg'
            className='group py-10! px-8! text-2xl'
            asChild
          >
            <Link href='/login'>
              로그인하여 서비스 사용하러 가기
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
