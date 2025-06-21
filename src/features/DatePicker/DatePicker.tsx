import { useRef } from 'react';
import { css } from '@emotion/react';
import { format } from 'date-fns';
import { DatePickerProps } from '../../types/datePickerTypes';

export const DatePicker = ({ selectedDate, setSelectedDate, minDate, maxDate }: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
    }
  };

  return (
    <div css={wrapperStyle} onClick={handleLabelClick}>
      <button onClick={handleLabelClick} css={labelStyle}>
        {formatDate(selectedDate)}
      </button>
      <input
        id='datePicker'
        ref={inputRef}
        type='date'
        min={minDate}
        max={maxDate}
        value={toInputFormat(selectedDate)}
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
        css={hiddenInputStyle}
      />
    </div>
  );
};

const formatDate = (date: Date): string => format(date, 'dd.MM.yyyy');

const toInputFormat = (date: Date): string => format(date, 'yyyy-MM-dd');

const wrapperStyle = css`
  position: relative;
`;

const labelStyle = css`
  font-size: 16px;
  font-weight: 600;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;


  &:focus,
  &:active {
    outline: none;
    border: none;
  }
`;

const hiddenInputStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  border: none;
  padding: 0;
  margin: 0;

  &:focus,
  &:active {
    outline: none;
    border: none;
  }
`;
