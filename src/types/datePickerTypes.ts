export interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  minDate?: string;
  maxDate?: string;
  isDatePickerPopupOpened?: boolean;
}
