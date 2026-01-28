'use client';

import { useGetApplicationStatistics } from '../hooks/useGetApplicationStatistics';

export default function ApplicationSummaryCards() {
  const { data } = useGetApplicationStatistics();

  const statItems = [
    {
      label: '전체 지원',
      value: data.totalApplicationCount ?? 0,
      color: 'bg-slate-100 text-slate-800',
    },
    {
      label: '서류 전형',
      value: data.docStageCount ?? 0,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      label: '기타 전형',
      value: data.etcStageCount ?? 0,
      color: 'bg-indigo-100 text-indigo-800',
    },
    {
      label: '면접 전형',
      value: data.interviewStageCount ?? 0,
      color: 'bg-orange-100 text-orange-800',
    },
    {
      label: '최종 합격',
      value: data.finalPassedCount ?? 0,
      color: 'bg-green-100 text-green-800',
    },
    {
      label: '최종 불합격',
      value: data.finalFailedCount ?? 0,
      color: 'bg-rose-100 text-rose-800',
    },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5'>
      {statItems.map((stat, idx) => (
        <div
          key={idx}
          className='bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 ...'
        >
          <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
            {stat.label}
          </span>
          <div className='flex items-baseline justify-between mt-3'>
            <span className='text-3xl font-extrabold'>{stat.value}</span>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${stat.color}`}
            >
              CASE
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
