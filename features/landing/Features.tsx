import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Users,
  BookMarked,
  Bell,
  ChevronRight,
} from 'lucide-react';

const FEATURE_LIST = [
  {
    title: '대시보드',
    desc: '전체 지원 현황과 다가오는 일정을 요약하여 보여줍니다. 나의 구직 활동 트렌드를 실시간으로 파악하세요.',
    icon: LayoutDashboard,
    color: 'bg-brand-500',
    shadow: 'shadow-brand-500/20',
    linkText: '종합 현황 요약',
    linkStyle: 'text-brand-600 dark:text-brand-400',
  },
  {
    title: '지원 관리',
    desc: 'URL 하나로 기업 정보를 AI가 추출합니다. 서류부터 최종 합격까지 모든 전형 단계를 체계적으로 트래킹하세요.',
    icon: Briefcase,
    color: 'bg-indigo-500',
    shadow: 'shadow-indigo-500/20',
    linkText: 'AI 정보 자동 추출',
    linkStyle: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    title: '캘린더',
    desc: '공고 마감일과 면접 시간을 캘린더에서 관리하세요. D-Day 기반 알림으로 중요한 일정을 놓치지 않습니다.',
    icon: Calendar,
    color: 'bg-emerald-500',
    shadow: 'shadow-emerald-500/20',
    linkText: '통합 일정 관리',
    linkStyle: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    title: '커뮤니티',
    desc: '실제 면접자들이 남긴 생생한 후기와 꿀팁을 확인하세요. 익명 게시판을 통해 기업 인사이트를 나눌 수 있습니다.',
    icon: Users,
    color: 'bg-orange-500',
    shadow: 'shadow-orange-500/20',
    linkText: '면접 인사이트 공유',
    linkStyle: 'text-orange-600 dark:text-orange-400',
  },
  {
    title: '면접 질문',
    desc: '받았던 질문이나 예상 질문을 기업별로 저장하세요. 커뮤니티의 질문을 내 보관함으로 즉시 담을 수 있습니다.',
    icon: BookMarked,
    color: 'bg-rose-500',
    shadow: 'shadow-rose-500/20',
    linkText: '나만의 질문 보관함',
    linkStyle: 'text-rose-600 dark:text-rose-400',
  },
  {
    title: '알림 서비스',
    desc: '서류 마감과 면접 시간 등 중요한 순간을 실시간으로 알려드립니다. 당신의 커리어 비서가 함께합니다.',
    icon: Bell,
    color: 'bg-blue-500',
    shadow: 'shadow-blue-500/20',
    linkText: '스마트 리마인더',
    linkStyle: 'text-blue-600 dark:text-blue-400',
  },
];

export default function Features() {
  return (
    <section className='py-32 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-24 space-y-4'>
          <h2 className='text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight'>
            구직자를 위한 최적의 도구
          </h2>
          <p className='text-slate-500 dark:text-slate-400 font-medium text-lg'>
            메모장과 엑셀을 넘어선 스마트한 커리어 워크플로우
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {FEATURE_LIST.map((f, i) => (
            <div
              key={i}
              className='bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group hover:-translate-y-2 transition-all'
            >
              <div
                className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-white shadow-xl ${f.shadow} mb-8`}
              >
                <f.icon className='w-7 h-7' />
              </div>
              <h3 className='text-2xl font-black text-slate-900 dark:text-white mb-4'>
                {f.title}
              </h3>
              <p className='text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6'>
                {f.desc}
              </p>
              <div
                className={`flex items-center gap-2 text-sm font-bold ${f.linkStyle}`}
              >
                <span>{f.linkText}</span>
                <ChevronRight className='w-4 h-4' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
