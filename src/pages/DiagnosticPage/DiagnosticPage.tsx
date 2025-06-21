import { css } from '@emotion/react';
import { LineChart } from '../../components/LineChart/LineChart';
import { diagnosticsMockData } from '../../Mocks/diagnosticsMock';
import { FaChartLine } from 'react-icons/fa6';
import { FaRegCalendar } from 'react-icons/fa';
import { DatePicker } from '../../features/DatePicker/DatePicker';
import { useState } from 'react';
import { format, subDays, subMonths } from 'date-fns';
import { DiagnosticType } from '../../types/diagnosticTypes';
import { DiagnosticTable } from '../../components/DiagnosticTable/DiagnosticTable';

export const DiagnosticPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(subDays(new Date(), 14));
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticType[]>(diagnosticsMockData);

  const minDate = format(subMonths(new Date(), 2), 'yyyy-MM-dd');
  const maxDate = format(new Date(), 'yyyy-MM-dd');

  const datePickerProps = { selectedDate, setSelectedDate, minDate, maxDate };
  const DiagnosticTableProps = { diagnosticData, setDiagnosticData };

  return (
    <div css={containerStyle}>
      <div css={chartContainerStyle}>
        <div css={chartTitleWrapperStyle}>
          <div css={chartTitleStyle}>
            <FaChartLine />
            <span>Fusion trend</span>
          </div>
          <div css={calendarWrapperStyle}>
            <FaRegCalendar />
            <span>From: </span>
            <DatePicker {...datePickerProps} />
          </div>
        </div>
        <div css={chartWrapperStyle}>
          <LineChart data={diagnosticData} selectedDate={selectedDate} />
        </div>
      </div>
      <div>
        <DiagnosticTable {...DiagnosticTableProps} />
      </div>
    </div>
  );
};

const calendarWrapperStyle = css`
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 16px;
  position: relative;
`;

const chartTitleWrapperStyle = css`
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 15px;
`;

const chartTitleStyle = css`
display: flex;
gap: 10px;
align-items: center;
font-weight: 600;
`;

const chartWrapperStyle = css`
height: 170px;
background-color: #fff;
border-radius: 10px;
padding: 10px;
`;

const chartContainerStyle = css`
background-color: #e7e8ec;
padding: 10px 5px 5px 5px;
border-radius: 10px;
`;

const containerStyle = css`

`;
