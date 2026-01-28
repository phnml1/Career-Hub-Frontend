import { Button } from '@/shared/components/ui/button';
import { Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className='py-40 px-6 text-center relative overflow-hidden'>
      {/* Background Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-500/5 blur-[120px] pointer-events-none'></div>

      <div className='max-w-4xl mx-auto space-y-12 relative z-10'>
        <div className='w-24 h-24 bg-brand-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-brand-500/30 mb-12 transform rotate-12 transition-transform hover:rotate-0'>
          <Rocket className='w-12 h-12 text-white' />
        </div>

        <h2 className='text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none'>
          당신의 다음 도약을
          <br />
          기록할 시간
        </h2>

        <p className='text-slate-500 dark:text-slate-400 text-lg md:text-2xl font-medium'>
          스마트한 구직 활동의 시작, CareerHub와 함께하세요.
          <br />
          무료로 모든 기능을 사용할 수 있습니다.
        </p>

        <div className='pt-6'>
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
