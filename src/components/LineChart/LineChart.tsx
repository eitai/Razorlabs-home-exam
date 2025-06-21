import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import {
  getChartDataByMaxSeverityPerDay,
  getColorBySeverity,
  getFilteredDiagnosticsBettweenDates,
  getSortedDataByDate,
  lineChartOptions,
  severityToNumber,
  SortDirection,
} from '../../services/lineChartService';
import { formatToMonthYear } from '../../utils/dateConvertors';
import { useMemo } from 'react';
import { DiagnosticDateParams } from '../../types/lineChartTypes';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

export const LineChart = ({ data, selectedDate }: DiagnosticDateParams) => {
  const chartDataByMaxSeverityPerDay = useMemo(() => {
    const filteredData = getFilteredDiagnosticsBettweenDates({ data, selectedDate });
    const filteredByMaxSeverityPerDayData = getChartDataByMaxSeverityPerDay({ chartData: filteredData });
    const sortedBydateChartData = getSortedDataByDate({ data: filteredByMaxSeverityPerDayData, direction: SortDirection.ASCENDING });

    return sortedBydateChartData;
  }, [data, selectedDate]);

  const chartData = {
    labels: chartDataByMaxSeverityPerDay.map(({ date }) => formatToMonthYear(date)),
    datasets: [
      {
        label: 'Severity Level',
        data: chartDataByMaxSeverityPerDay.map(({ date, severity, faultType }) => ({
          x: formatToMonthYear(date),
          y: severityToNumber[severity as keyof typeof severityToNumber],
          faultType,
          severity,
        })),
        borderColor: '#babcc0',
        borderWidth: 1,
        tension: 0.1,
        pointRadius: 5,
        pointBorderWidth: 0,
        pointBackgroundColor: chartDataByMaxSeverityPerDay.map(({ severity }) => getColorBySeverity(severity)),
      },
    ],
  };

  return <Line data={chartData} options={lineChartOptions} />;
};
