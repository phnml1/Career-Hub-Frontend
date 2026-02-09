'use client';

import { Button } from '@/shared/components/ui/button';
import { ButtonGroup } from '@/shared/components/ui/button-group';
import { designTokens } from '@/shared/constants/designTokens';
import { ChartColumnIcon, TrendingUpIcon } from 'lucide-react';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  TooltipProps,
} from 'recharts';
import { useGetApplicationCreationStatistics } from '../hooks/useGetApplicationCreationStatistics';
import { cn } from '@/shared/lib/utils';

interface ChartDataItem {
  xAxisLabel: string;
  fullPeriod: string;
  applicationsCount: number;
  isCurrent: boolean;
}

interface PayloadItem {
  payload: ChartDataItem; // 우리가 넣은 원본 데이터
  value: number; // Bar의 데이터 값 (applicationsCount)
  name: string; // Bar의 이름
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: PayloadItem[];
}

export default function ActivityChart() {
  const [chartView, setChartView] = useState<'WEEKLY' | 'MONTHLY'>('WEEKLY');

  const { data } = useGetApplicationCreationStatistics();

  const activeData: ChartDataItem[] = data ? data[chartView] : [];

  const currentCount =
    activeData.find((item) => item.isCurrent)?.applicationsCount ?? 0;
  const periodLabel = chartView === 'WEEKLY' ? '주' : '달';

  return (
    <div className='bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border'>
      <div className='flex justify-between mb-8'>
        <div className='flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-2 text-xl font-bold text-slate-900 dark:text-slate-100'>
            <ChartColumnIcon className='w-5 h-5 text-brand-500 stroke-2' /> 지원
            활동 분석
          </div>
          <p className='text-sm font-semibold text-slate-400'>
            최근 생성한 지원 관리 개수 현황 차트입니다.
          </p>
        </div>

        <ButtonGroup className='bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl flex text-xs font-bold self-start sm:self-center'>
          {(['WEEKLY', 'MONTHLY'] as const).map((view) => {
            const isActive = chartView === view;

            return (
              <Button
                key={view}
                size='lg'
                variant='secondary'
                onClick={() => setChartView(view)}
                className={cn(
                  // 공통 스타일
                  'px-4 py-2 rounded-lg! transition-all',
                  // 비활성 상태 스타일
                  'text-slate-500 dark:text-slate-400 hover:text-slate-700',
                  // 활성 상태 스타일 (활성화 시에만 덮어쓰기)
                  isActive &&
                    'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm font-semibold',
                )}
              >
                {view === 'WEEKLY' ? '주간' : '월간'}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
      <div className='h-64 relative'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={activeData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              className='dark:stroke-slate-800 stroke-slate-100'
            />
            <XAxis
              dataKey='xAxisLabel'
              axisLine={false}
              tickLine={false}
              tick={{
                fill: designTokens.colors.slate[400],
                fontSize: 12,
                fontWeight: 600,
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: designTokens.colors.slate[400], fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: designTokens.colors.slate[50], opacity: 0.5 }}
            />
            <Bar
              dataKey='applicationsCount'
              fill={designTokens.colors.brand[500]}
              radius={[8, 8, 0, 0]}
              barSize={32}
              name='지원 관리 개수'
            >
              {activeData.map((entry, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  // 이번 주/달은 진한 색상, 나머지는 연한 색상
                  fill={
                    entry.isCurrent
                      ? designTokens.colors.brand[500]
                      : designTokens.colors.brand[200]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='mt-6 flex items-center justify-center text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-500'>
        <TrendingUpIcon
          className='w-4 h-4 mr-2 text-brand-500'
          aria-hidden='true'
        />
        <span>
          이번 {periodLabel}는{' '}
          <span className='font-bold text-slate-900 dark:text-slate-100'>
            {currentCount}건
          </span>
          의 지원 카드를 만들었어요.
        </span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;

    return (
      <div className='bg-white dark:bg-slate-800 p-3 px-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700'>
        {/* 툴팁 상단에 실제 기간 표시 */}
        <p className='text-[10px] font-bold text-slate-400 mb-1'>
          {data.fullPeriod}
        </p>
        <div className='flex items-center gap-x-2'>
          <div className='w-2 h-2 rounded-full bg-brand-500' />
          <p className='text-sm font-extrabold text-slate-700 dark:text-slate-200'>
            지원 관리{' '}
            <span className='text-brand-600'>{payload[0].value}건</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};
