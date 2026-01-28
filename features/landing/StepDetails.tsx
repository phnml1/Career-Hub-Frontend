import { Bell } from 'lucide-react';

export default function StepDetails() {
  const platforms = ['원티드', '사람인', '링크드인', '잡코리아'];

  return (
    <section className='py-32 px-6'>
      <div className='max-w-4xl mx-auto space-y-32'>
        {/* 01. AI Extraction */}
        <div className='flex flex-col md:flex-row items-start gap-12'>
          <div className='w-full md:w-1/3'>
            <div className='text-6xl font-black text-brand-500/10 dark:text-brand-500/5 mb-4'>
              01
            </div>
            <h2 className='text-3xl font-black text-slate-900 dark:text-white leading-tight'>
              자동으로 채워지는
              <br />
              지원 카드.
            </h2>
          </div>
          <div className='flex-1 space-y-6'>
            <p className='text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed'>
              지원하고 싶은 공고의 링크만 복사해오세요.
              <br />
              AI가 해당 페이지를 분석해 회사 이름, 포지션, 마감일을 자동으로
              분류해 카드로 만들어 드립니다. 엑셀 입력 시간은 이제 0초입니다.
            </p>
            <div className='flex flex-wrap gap-3 pt-2'>
              {platforms.map((name) => (
                <span
                  key={name}
                  className='px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-black text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                >
                  # {name} 완벽 지원
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 02. Smart Notifications */}
        <div className='flex flex-col md:flex-row items-start gap-12'>
          <div className='w-full md:w-1/3'>
            <div className='text-6xl font-black text-blue-500/10 dark:text-blue-500/5 mb-4'>
              02
            </div>
            <h2 className='text-3xl font-black text-slate-900 dark:text-white leading-tight'>
              놓칠 수 없는 일정을
              <br />
              알려주는 비서.
            </h2>
          </div>
          <div className='flex-1 space-y-6'>
            <p className='text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed'>
              수많은 공고 사이에서 마감일을 잊어버린 적이 있나요?
              <br />
              CareerHub는 서류 마감 D-3부터 면접 1시간 전까지, 당신의 브라우저와
              모바일로 가장 중요한 알림을 보냅니다.
            </p>
            <div className='p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex items-center gap-4'>
              <div className='w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-500 shadow-sm'>
                <Bell className='w-6 h-6 animate-bounce' />
              </div>
              <div>
                <div className='text-sm font-black text-blue-800 dark:text-blue-300'>
                  면접 D-1 알림
                </div>
                <div className='text-xs text-blue-600 dark:text-blue-400 font-medium'>
                  내일 오후 2시, 구글 코리아 면접이 있습니다. 준비되셨나요?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
