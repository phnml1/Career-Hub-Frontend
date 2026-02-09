'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChartIcon } from 'lucide-react';

import { designTokens } from '@/shared/constants/designTokens';
import { useGetApplicationStatistics } from '../hooks/useGetApplicationStatistics';

export default function StatusPieChart() {
  const { data } = useGetApplicationStatistics();

  const chartData = [
    {
      name: '서류 전형',
      value: data.docStageCount,
      color: designTokens.colors.status.info,
    },
    {
      name: '기타 전형',
      value: data.etcStageCount,
      color: designTokens.colors.status.secondary,
    },
    {
      name: '면접 전형',
      value: data.interviewStageCount,
      color: designTokens.colors.status.warning,
    },
    {
      name: '최종 합격',
      value: data.finalPassedCount,
      color: designTokens.colors.status.success,
    },
    {
      name: '최종 불합격',
      value: data.finalFailedCount,
      color: designTokens.colors.status.error,
    },
  ];

  return (
    <div className='bg-card p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors'>
      <div className='flex gap-x-2 items-center'>
        <PieChartIcon className='w-5 h-5 text-brand-500' />
        <div className='font-bold text-slate-900 dark:text-slate-100 text-xl'>
          지원 현황 비중
        </div>
      </div>

      <div className='h-48'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={chartData}
              cx='50%'
              cy='50%'
              innerRadius={50}
              outerRadius={70}
              paddingAngle={8}
              dataKey='value'
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke='none' />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              }}
              itemStyle={{ fontWeight: 'bold', fontSize: '13px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='flex flex-wrap justify-center gap-4 mt-4 text-[11px] font-bold text-slate-500 dark:text-slate-400'>
        {chartData.map((d, i) => (
          <div key={i} className='flex items-center space-x-1.5'>
            <div
              className='w-2.5 h-2.5 rounded-full'
              style={{ backgroundColor: d.color }}
            ></div>
            <span>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
