
declare module 'react-datepicker' {
  import React from 'react';
  
  export interface ReactDatePickerProps {
    selected?: Date | null;
    onChange?: (date: Date | null) => void;
    startDate?: Date | null;
    endDate?: Date | null;
    minDate?: Date;
    maxDate?: Date;
    dateFormat?: string | string[];
    className?: string;
    placeholderText?: string;
    disabled?: boolean;
    required?: boolean;
    autoComplete?: string;
    name?: string;
    showTimeSelect?: boolean;
    showTimeSelectOnly?: boolean;
    timeIntervals?: number;
    timeCaption?: string;
    timeFormat?: string;
    monthsShown?: number;
    [key: string]: any;
  }
  
  declare const DatePicker: React.FC<ReactDatePickerProps>;
  
  export default DatePicker;
}
