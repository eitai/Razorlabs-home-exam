import type { TooltipItem } from 'chart.js';
import { DiagnosticType } from '../types/diagnosticTypes';
import { ChartPoint } from '../types/lineChartTypes';
import { addDays, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import { DiagnosticDateParams } from '../types/lineChartTypes';

export const getColorBySeverity = (severity: string) => {
  switch (severity) {
    case 'Healthy':
      return '#6ddf6d';
    case 'Alarm':
      return '#f39c12';
    case 'Critical':
      return '#e74c3c';
  }
};

export const severityToNumber = {
  Critical: 1,
  Alarm: 2,
  Healthy: 3,
} as const;

export const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        font: {
          size: 10,
        },
        align: 'start' as const,
        padding: 10,
      },
      grid: {
        display: true,
        drawBorder: false,
        color: '#ccc',
        lineWidth: 1,
      },
      border: {
        display: false,
        dash: [6, 2],
      },
    },
    y: {
      suggestedMax: 4,
      suggestedMin: 0,
      grid: { display: false, drawBorder: false },
      ticks: { display: false },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem: TooltipItem<'line'>) => {
          const raw = tooltipItem.raw as { y: number; faultType: string; severity: string };
          return `Severity: ${raw.severity} | Fault: ${raw.faultType}`;
        },
        title: (tooltipItems: TooltipItem<'line'>[]) => {
          return `Date: ${tooltipItems[0].label}`;
        },
      },
    },
  },
};

export const getChartDataByMaxSeverityPerDay = ({ chartData }: { chartData: DiagnosticType[] }): DiagnosticType[] =>
  chartData.reduce((acc, data) => {
    const existingDataIndex = acc.findIndex((item) => item.date === data.date);

    if (existingDataIndex !== -1) {
      const existingSeverity = severityToNumber[acc[existingDataIndex].severity as keyof typeof severityToNumber];
      const currentSeverity = severityToNumber[data.severity as keyof typeof severityToNumber];

      if (currentSeverity < existingSeverity) {
        acc[existingDataIndex] = data;
      }
    } else {
      acc.push(data);
    }

    return acc;
  }, [] as DiagnosticType[]);

export const SortDirection = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
} as const;

export type SortDirectionType = (typeof SortDirection)[keyof typeof SortDirection];

export const getSortedDataByDate = ({
  data,
  direction = SortDirection.ASCENDING,
}: {
  data: ChartPoint[];
  direction?: SortDirectionType;
}) =>
  data.sort((a, b) =>
    direction === SortDirection.ASCENDING
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime()
  );

export const getFilteredDiagnosticsBettweenDates = ({ data, selectedDate }: DiagnosticDateParams) => {
  const fromDate = startOfDay(selectedDate);
  const toDate = startOfDay(addDays(selectedDate, 14));

  return data.filter((item) => isWithinInterval(startOfDay(parseISO(item.date)), { start: fromDate, end: toDate }));
};

export const getSortedDataByDateAndSeverity = (data: DiagnosticType[]): DiagnosticType[] =>
  data.sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    const dateDiff = bTime - aTime;

    if (dateDiff !== 0) return dateDiff;

    const aSeverity = severityToNumber[a.severity as keyof typeof severityToNumber];
    const bSeverity = severityToNumber[b.severity as keyof typeof severityToNumber];
    return aSeverity - bSeverity;
  });
